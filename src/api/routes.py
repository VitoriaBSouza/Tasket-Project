"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from sqlalchemy import select, delete, func
from api.models import db, User, List, Pinned, Task, ListStatus, TaskStatus
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from api.user_utils import generate_placeholder
from datetime import datetime, timezone

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Get all users (for test purposes)
@api.route('/users', methods=['GET'])
def get_users():

    statement = select(User)

    users = db.session.execute(statement).scalars().all()

    return jsonify({"users":[user.serialize() for user in users], "success":True}), 200

# POST to create a new user
@api.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()

        if not data["email"] or not data["password"] or not data["username"]: 
            return jsonify({"error": "Missing required information"}), 400

        # Check if user is registered
        stm = select(User).where(User.email == data["email"], User.username == data["username"])
        user = db.session.execute(stm).scalar_one_or_none()

        if user:
            if user.email:
                return jsonify({"error": "This email is already registered, please log in"}), 409

            if user.username:
                return jsonify({"error": "This username is already been used, try another one."}), 409

        # Generate a placeholder image with random color and username initial
        #User will be able to change later
        placeholder_url = generate_placeholder(data["username"])

        # hash password to not show to others
        hashed_password = generate_password_hash(data["password"])

        new_user = User(
            username=data["username"],
            photo_url = data.get("photo_url", placeholder_url),
            email=data["email"].strip().lower(),
            password=hashed_password,
            created_at=datetime.now(timezone.utc),
            #we will update this field on PUT method, created_at remains the same
            updated_at=datetime.now(timezone.utc)
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"success": True}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# POST to make authentication to log in
@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.json

        if not data["email"] or not data["password"]: 
            return jsonify({"error": "Missing required information"}), 400
        
        #Check if the user has an account
        email = data["email"].strip().lower()
        stmt = select(User).where(User.email==email)
        user = db.session.execute(stmt).scalar_one_or_none()

        if user is None:
            return jsonify({"error": "User not found, please sign up"}), 404

        # Check if the password matches the user
        if not user or not check_password_hash(user.password, data["password"]):
            return jsonify({"error": "Email or password not valid"}), 401

       #Generate str token as it's not possible to be a number
        token = create_access_token(identity=str(user.id))
  
        return jsonify({"success": True, "token": token, "user": user.serialize()}), 200
    
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    
# GET one user profile
# Requires to request the token from the frontend
@api.route('/user', methods=['GET'])
@jwt_required() 
def get_user_profile():

    id = get_jwt_identity()
    stm = select(User).where(User.id == id)
    user = db.session.execute(stm).scalar_one_or_none()
    
    if not user:
        return jsonify({"success": False, "error": "Something went wrong, try to refresh page or log in again."})

    return jsonify({"success": True, "user":user.serialize()})

# PUT to update user profile
@api.route("/user", methods=["PUT"])
@jwt_required() 
def update_user():

    user_id = get_jwt_identity()
    data = request.json

    # Check if new details are already registered
    email = data.get("email")
    username = data.get("username")

    check_user = None
    if email or username:
        check_stm = select(User).where(User.id != user_id)
        if email and username:
            check_stm = check_stm.where((User.email == email) | (User.username == username))
        elif email:
            check_stm = check_stm.where(User.email == email)
        elif username:
            check_stm = check_stm.where(User.username == username)

        check_user = db.session.execute(check_stm).scalar_one_or_none()

    if check_user:
        if email == check_user.email:
            return jsonify({"error": "This email is already registered"}), 409
        if username == check_user.username:
            return jsonify({"error": "This username is already used"}), 409

    stm = select(User).where(User.id == user_id)
    user = db.session.execute(stm).scalar_one_or_none()

    if user is None:
        return jsonify({"error": "User not found"}), 404

    if "email" in data:
        user.email = data["email"].strip().lower()
    if "password" in data:
        user.password = generate_password_hash(data["password"])
    if "username" in data:
        user.username = data["username"]
    if "photo_url" in data:
        placeholder_url = generate_placeholder(data.get("username", user.username))
        # If no foto added or foto is deleted then will use the placeholder
        user.photo_url = data["photo_url"] or placeholder_url

    user.updated_at = datetime.now(timezone.utc)
    
    db.session.commit()

    return jsonify({"success": True, "user": user.serialize()}), 200


# DELETE user account (we do not keep any data)
@api.route("/user", methods=["DELETE"])
@jwt_required()
def delete_user():

    user_id = get_jwt_identity()

    # Get user and related lists
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({"error": "User not found"}), 404

    # Get all list IDs belonging to the user
    list_ids = [lst.id for lst in user.lists]

    # Delete related records in the correct order
    if list_ids:
        db.session.execute(delete(Task).where(Task.list_id.in_(list_ids)))
        db.session.execute(delete(Pinned).where(Pinned.list_id.in_(list_ids)))
        db.session.execute(delete(List).where(List.id.in_(list_ids)))

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "Your account has been successfully erased", "success": True}), 200

# GET all lists of all users (for test purposes)
@api.route('/lists', methods=['GET'])
def get_all_lists():

    stm = select(List)
    lists = db.session.execute(stm).scalars().all()
    
    if not lists:
        return jsonify({"success": False, "error": "No lists found"}), 404

    return jsonify({"success": True, "lists": [l.serialize() for l in lists]}), 200

# GET all lists of the user
@api.route('/user/lists', methods=['GET'])
@jwt_required() 
def get_lists():

    user_id = get_jwt_identity()
    stm = select(List).where(List.user_id == user_id)
    lists = db.session.execute(stm).scalars().all()
    
    if not lists:
        return jsonify({"success": False, "error": "You have no lists yet, create one!"}), 404

    return jsonify({"success": True, "lists": [l.serialize() for l in lists]}), 200

# GET one lists of the user
@api.route('/user/list/<int:list_id>', methods=['GET'])
@jwt_required()
def get_one_list(list_id):

    user_id = get_jwt_identity()
    stm = select(List).where((List.user_id == user_id) & (List.id == list_id))
    list = db.session.execute(stm).scalar_one_or_none()
    
    if not list:
        return jsonify({"success": False, "error": "List not found or no permission"}), 404

    return jsonify({"success": True, "list": list.serialize()}), 200

# POST a new list
@api.route('/user/lists', methods=['POST'])
@jwt_required() 
def add_list():

    user_id = get_jwt_identity()

    try:
        data = request.json

        if not data["title"]: 
            return jsonify({"error": "Please add a title to your list"}), 400

        # We add on frontend the control of blank space and lower cases
        new_list = List(
            user_id=user_id,
            title=data["title"],
            description= data["description"],
            status=ListStatus.pending,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        db.session.add(new_list)
        db.session.commit()

        return jsonify({"success": True, "list": new_list.serialize()}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# PUT to update list details
@api.route("/user/list/<int:list_id>", methods=["PUT"])
@jwt_required() 
def update_list(list_id):

    try:
        data = request.json
        user_id = get_jwt_identity()
        stm = select(List).where((List.user_id == user_id) & (List.id == list_id))
        list = db.session.execute(stm).scalar_one_or_none()

        if list is None:
            return jsonify({"error": "List not found or you do not have permission"}), 403
 

        if "title" in data:
            list.title = data["title"]
        if "description" in data:
            list.description = data["description"]

        list.updated_at = datetime.now(timezone.utc)
        
        db.session.commit()

        return jsonify({"success": True, "list": list.serialize()}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# DELETE list
@api.route("/user/list/<int:list_id>", methods=["DELETE"])
@jwt_required()
def delete_list(list_id):

    user_id = get_jwt_identity()
    stm = select(List).where((List.user_id == user_id) & (List.id == list_id))
    list = db.session.execute(stm).scalar_one_or_none()

    if list is None:
        return jsonify({"error": "List not found or you do not have permission"}), 403

    # Delete tasks and pinned items related to the list
    db.session.execute(delete(Pinned).where(Pinned.list_id == list.id))
    db.session.execute(delete(Task).where(Task.list_id == list.id))

    # Finally delete the list
    db.session.delete(list)
    db.session.commit()

    return jsonify({"message": "List deleted", "success": True}), 200

# DELETE all lists of a user
@api.route("/user/lists", methods=["DELETE"])
@jwt_required()
def delete_all_lists():

    user_id = get_jwt_identity()

    stm = select(List).where(List.user_id == user_id)
    lists = db.session.execute(stm).scalars().all()
    
    if not lists:
        return jsonify({"success": False, "error": "No lists found"}), 403

    # Delete tasks of the lists, then pinned items, then the lists
    list_ids = [lst.id for lst in lists]
    
    db.session.execute(delete(Pinned).where(Pinned.list_id.in_(list_ids)))
    db.session.execute(delete(Task).where(Task.list_id.in_(list_ids)))
    db.session.execute(delete(List).where(List.user_id == user_id))
    
    db.session.commit()

    return jsonify({"message": "All listed where deleted", "success": True}), 200

    
# GET all tasks of a list 
@api.route('/user/list/<int:list_id>/tasks', methods=['GET'])
@jwt_required() 
def get_all_tasks(list_id):

    #Check user has access to the list
    user_id = get_jwt_identity()
    stm = select(List).where((List.user_id == user_id) & (List.id == list_id))
    list = db.session.execute(stm).scalar_one_or_none()
    
    if not list:
        return jsonify({"success": False, "error": "List not found or no permission"}), 403

    # Get all task for that list
    stm_task = select(Task).where(Task.list_id == list_id)
    tasks = db.session.execute(stm_task).scalars().all()

    if not tasks:
        return jsonify({"success": False, "error": "You have no tasks yet, create one!"}), 404

    return jsonify({"success": True, "tasks": [t.serialize() for t in tasks]}), 200

# GET one tasks of a list
@api.route('/user/list/<int:list_id>/task/<int:task_id>', methods=['GET'])
@jwt_required() 
def get_one_task(list_id, task_id):

    #Check user has access to the list
    user_id = get_jwt_identity()
    stm = select(List).where((List.user_id == user_id) & (List.id == list_id))
    list = db.session.execute(stm).scalar_one_or_none()
    
    if not list:
        return jsonify({"success": False, "error": "List not found or no permission"}), 403

    # Get the task details
    stm_task = select(Task).where((Task.list_id == list_id) & (Task.id == task_id))
    task = db.session.execute(stm_task).scalar_one_or_none()

    if not task:
        return jsonify({"success": False, "error": "Task not found"}), 404

    return jsonify({"success": True, "task": task.serialize()}), 200

# POST a new task
@api.route('/user/list/<int:list_id>/task', methods=['POST'])
@jwt_required() 
def add_task(list_id):

    user_id = get_jwt_identity()

    list= db.session.execute(select(List).where(
        List.id == list_id, 
        List.user_id == user_id)).scalar_one_or_none()

    if list is None:
        return jsonify({"error": "List not found or you do not have permission"}), 403

    try:
        data = request.json

        if not data["task"]: 
            return jsonify({"error": "Please add a title to your list"}), 400

        # We add on frontend the control of blank space and lower cases
        new_task = Task(
            list_id=list_id,
            task=data["task"],
            location=data.get("location"),
            due_at=data.get("due_at"),
            schedule_at=data.get("schedule_at"),
            reminder_at=data.get("reminder_at"),
            status=TaskStatus.pending,
            urgent=False,
            comment=data["comment"],
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        db.session.add(new_task)
        db.session.commit()

        return jsonify({"success": True, "task": new_task.serialize()}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# PUT to update task details
@api.route("/user/list/<int:list_id>/task/<int:task_id>", methods=["PUT"])
@jwt_required() 
def update_task(list_id, task_id):

    try:
        data = request.json
        user_id = get_jwt_identity()

        stm = select(List).where((List.user_id == user_id) & (List.id == list_id))
        list = db.session.execute(stm).scalar_one_or_none()
        
        if not list:
            return jsonify({"success": False, "error": "List not found or no permission"}), 403
        
        stm_task = select(Task).where((Task.list_id == list_id) & (Task.id == task_id))
        task = db.session.execute(stm_task).scalar_one_or_none()

        if not task:
            return jsonify({"success": False, "error": "Task not found"}), 404

        if "task" in data:
            task.task = data["task"]
        if "due_at" in data:
            task.due_at = data["due_at"]
        if "schedule_at" in data:
            task.schedule_at = data["schedule_at"]
        if "reminder_at" in data:
            task.reminder_at = data["reminder_at"]
        if "location" in data:
            task.location = data["location"]
        if "comment" in data:
            task.comment = data["comment"]

        task.updated_at = datetime.now(timezone.utc)
        
        db.session.commit()

        return jsonify({"success": True, "task": task.serialize()}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# PUT to update task urgent status
@api.route("/user/list/<int:list_id>/task/<int:task_id>/urgent", methods=["PUT"])
@jwt_required() 
def update_task_urgency(list_id, task_id):

    try:
        data = request.json
        user_id = get_jwt_identity()

        stm = select(List).where((List.user_id == user_id) & (List.id == list_id))
        list = db.session.execute(stm).scalar_one_or_none()
        
        if not list:
            return jsonify({"success": False, "error": "List not found or no permission"}), 403
        
        stm_task = select(Task).where((Task.list_id == list_id) & (Task.id == task_id))
        task = db.session.execute(stm_task).scalar_one_or_none()

        if not task:
            return jsonify({"success": False, "error": "Task not found"}), 404

        if "urgent" in data:
            task.urgent = bool(data["urgent"])
            print("Urgent updated to:", task.urgent)

        task.updated_at = datetime.now(timezone.utc)
        
        db.session.commit()

        return jsonify({"success": True, "task": task.serialize()}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# PUT to update task status
@api.route("/user/list/<int:list_id>/task/<int:task_id>/status", methods=["PUT"])
@jwt_required() 
def update_task_status(list_id, task_id):

    try:
        data = request.json

        user_id = get_jwt_identity()

        stm = select(List).where((List.user_id == user_id) & (List.id == list_id))
        list = db.session.execute(stm).scalar_one_or_none()
        
        if not list:
            return jsonify({"success": False, "error": "List not found or no permission"}), 403
        
        stm_task = select(Task).where((Task.list_id == list_id) & (Task.id == task_id))
        task = db.session.execute(stm_task).scalar_one_or_none()

        if not task:
            return jsonify({"success": False, "error": "Task not found"}), 404

        if "status" in data:
            task.status = TaskStatus(data["status"])

        task.updated_at = datetime.now(timezone.utc)

        db.session.flush()

        # Will check status of the task on the list to update the list status to completed or pending
        # If all tasks are completed then the list is completed, otherwise it is pending
        pending_count = db.session.execute(
            select(func.count(Task.id)).where(Task.list_id == list_id, Task.status == TaskStatus.pending)
        ).scalar_one()

        list = db.session.execute(select(List).where(List.id == list_id)).scalar_one()

        if pending_count == 0:
            list.status = ListStatus.completed
        else:
            list.status = ListStatus.pending

        list.updated_at = datetime.now(timezone.utc)

        db.session.commit()

        return jsonify({"success": True, "task": task.serialize()}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# DELETE one task of a list
@api.route("/user/list/<int:list_id>/task/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_one_task(list_id, task_id):

    user_id = get_jwt_identity()

    stm = select(List).where((List.user_id == user_id) & (List.id == list_id))
    list = db.session.execute(stm).scalar_one_or_none()
    
    if not list:
        return jsonify({"success": False, "error": "List not found or no permission"}), 403
    
    stm_task = select(Task).where((Task.list_id == list_id) & (Task.id == task_id))
    task = db.session.execute(stm_task).scalar_one_or_none()

    if task is None:
        return jsonify({"error": "Task not found or you do not have permission"}), 403

    # Delete tasks from list
    db.session.delete(task)

    db.session.commit()

    return jsonify({"message": "Task deleted", "success": True}), 200
    
# DELETE all task of a list
@api.route("/user/list/<int:list_id>/tasks", methods=["DELETE"])
@jwt_required()
def delete_all_tasks(list_id):

    user_id = get_jwt_identity()

    stm = select(List).where((List.user_id == user_id) & (List.id == list_id))
    list = db.session.execute(stm).scalar_one_or_none()
    
    if not list:
        return jsonify({"success": False, "error": "List not found or no permission"}), 403
    
    stm_task = select(Task).where((Task.list_id == list_id))
    task = db.session.execute(stm_task).scalars().all()

    if not task:
        return jsonify({"error": "No tasks found"}), 403

    # Delete tasks from list
    db.session.execute(delete(Task).where(Task.list_id == list_id))
    
    db.session.commit()

    return jsonify({"message": "Tasks deleted", "success": True}), 200

# GET all pinned lists of all users (for test purposes)
@api.route('/lists/pinned', methods=['GET'])
def get_all_lists_pinned():

    stm = select(Pinned)
    pinned = db.session.execute(stm).scalars().all()
    
    if not pinned:
        return jsonify({"success": False, "error": "No pinned lists found"}), 404

    return jsonify({"success": True, "pinned": [p.serialize() for p in pinned]}), 200

# GET all lists pinned by user
@api.route('/user/lists/pinned', methods=['GET'])
@jwt_required() 
def get_user_lists_pinned():

    user_id = get_jwt_identity()
    stm = select(Pinned).where(Pinned.user_id == user_id)
    pinned = db.session.execute(stm).scalars().all()
    
    if not pinned:
        return jsonify({"success": False, "error": "You have no pinned list yet, add one!"}), 404

    return jsonify({"success": True, "pinned": [p.serialize() for p in pinned]}), 200

# GET one lists pinned by user
@api.route('/user/list/<int:list_id>/pinned', methods=['GET'])
@jwt_required()
def get_one_list_pinned(list_id):

    user_id = get_jwt_identity()
    stm = select(Pinned).where((Pinned.user_id == user_id) & (Pinned.list_id == list_id))
    pinned = db.session.execute(stm).scalar_one_or_none()
    
    if not pinned:
        return jsonify({"success": False, "error": "Pinned list not found or no permission"}), 404

    return jsonify({"success": True, "pinned": pinned.serialize()}), 200

# POST to pin a list
@api.route('/user/list/<int:list_id>/pinned', methods=['POST'])
@jwt_required() 
def pin_list(list_id):

    user_id = get_jwt_identity()

    # Check if user can access the list
    list_stm = select(List).where((List.id == list_id) & (List.user_id == user_id))
    list = db.session.execute(list_stm).scalar_one_or_none()

    if not list:
        return jsonify({"success": False, "error": "List not found or no permission"}), 404
    
    # Check if list is already pinned
    stm = select(Pinned).where((Pinned.user_id == user_id) & (Pinned.list_id == list_id))
    pinned = db.session.execute(stm).scalar_one_or_none()

    if pinned:
        return jsonify({"success": False, "error": "List already pinned"}), 409       

    try:

        # We add on frontend the control of blank space and lower cases
        new_pin = Pinned(
            user_id=user_id,
            list_id=list_id,
            created_at=datetime.now(timezone.utc),
        )
        db.session.add(new_pin)
        db.session.commit()

        return jsonify({"success": True, "pinned": new_pin.serialize()}), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# DELETE list from pinned table
@api.route("/user/list/<int:list_id>/pinned", methods=["DELETE"])
@jwt_required()
def unpin_list(list_id):

    user_id = get_jwt_identity()
    
    # Check if list is pinned
    stm = select(Pinned).where((Pinned.user_id == user_id) & (Pinned.list_id == list_id))
    pinned = db.session.execute(stm).scalar_one_or_none()

    if pinned is None:
        return jsonify({"success": False, "error": "List not pinned or no permission"}), 404

    # Delete pinned list from table
    db.session.delete(pinned)

    db.session.commit()

    return jsonify({"message": "Unpinned list", "success": True}), 200
