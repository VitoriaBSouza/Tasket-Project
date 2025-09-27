from dotenv import load_dotenv
load_dotenv()

from werkzeug.security import generate_password_hash
from random import choice
from datetime import datetime, timezone, timedelta
from api.models import User, List, Task, Pinned, ListStatus, TaskStatus
from app import app, db

with app.app_context():

    print("Conectando a DB:", app.config['SQLALCHEMY_DATABASE_URI'])
    db.create_all()

    # Clear all tables
    Task.query.delete()
    Pinned.query.delete()
    List.query.delete()
    User.query.delete()
    db.session.commit()

    # Create 3 users
    users = [
        User(
            username=f"user{i+1}",
            email=f"user{i+1}@mail.com",
            password=generate_password_hash('123'),
            photo_url=f"https://picsum.photos/300/300?random={i+1}",
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
        )
        for i in range(3)
    ]
    db.session.add_all(users)
    db.session.commit()

    # Create 50 lists PER USER
    lists = []
    for user in users:
        for i in range(50):
            new_list = List(
                user_id=user.id,
                title=f"List {i+1} of {user.username}",
                description=f"Description for list {i+1} of {user.username}",
                status=ListStatus.pending,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
            )
            db.session.add(new_list)
            lists.append(new_list)
    db.session.commit()

    # Create 14 tasks per list
    tasks = []
    now = datetime.now(timezone.utc)
    sample_locations = ["Home", "Office", "Supermarket", "Gym"]

    for list_ in lists:
        for k in range(14):
            new_task = Task(
                list_id=list_.id,
                task=f"Task {k+1} for {list_.title}",
                location=choice(sample_locations),
                due_at=(now + timedelta(days=k+1)).replace(microsecond=0).isoformat(),
                schedule_at=(now + timedelta(days=k, hours=9)).replace(microsecond=0).isoformat(),
                reminder_at=(now + timedelta(days=k, hours=8)).replace(microsecond=0).isoformat(),
                status=TaskStatus.pending,
                urgent=choice([True, False]),
                comment=f"Comment {k+1} for {list_.title}",
                created_at=now.isoformat(),
                updated_at=now.isoformat(),
            )
            db.session.add(new_task)
            tasks.append(new_task)
    db.session.commit()

    # Pin first 3 lists of first user
    first_user = users[0]
    for list_ in lists[:3]:
        pin = Pinned(
            user_id=first_user.id,
            list_id=list_.id,
            created_at=datetime.now(timezone.utc),
        )
        db.session.add(pin)
    db.session.commit()

    print("✅ Seeder ejecutado correctamente: 50 listas por usuario y 14 tareas cada una.")