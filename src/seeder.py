from dotenv import load_dotenv
load_dotenv()

from werkzeug.security import generate_password_hash
from random import choice
from datetime import datetime, timezone
from api.models import User, List, Task, Pinned, ListStatus, TaskStatus
from app import app, db

with app.app_context():

    print("Conectando a DB:", app.config['SQLALCHEMY_DATABASE_URI'])
    # Crear tablas si no existen
    db.create_all()

    # Limpia tablas (opcional, cuidado en prod)
    Task.query.delete()
    List.query.delete()
    Pinned.query.delete()
    User.query.delete()
    db.session.commit()

    # Crear usuarios
    users = [
        User(
            username=f"user{i+1}",
            email=f"user{i+1}@mail.com",
            password=generate_password_hash('password123'),
            photo_url=f"https://via.placeholder.com/150?text={chr(65+i)}",
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
        )
        for i in range(3)
    ]
    db.session.add_all(users)
    db.session.commit()  # para tener ids

    # Crear listas para usuarios
    lists = []
    for user in users:
        for j in range(2):
            new_list = List(
                user_id=user.id,
                title=f"List {j+1} of {user.username}",
                description=f"Description for list {j+1}",
                status=ListStatus.pending,
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
            )
            db.session.add(new_list)
            lists.append(new_list)
    db.session.commit()

    # Crear tareas para listas
    tasks = []
    for list_ in lists:
        for k in range(3):
            new_task = Task(
                list_id=list_.id,
                task=f"Task {k+1} for {list_.title}",
                location=None,
                due_at=None,
                schedule_at=None,
                reminder_at=None,
                status=TaskStatus.pending,
                urgent=choice([True, False]),
                comment=f"Comment {k+1}",
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
            )
            db.session.add(new_task)
            tasks.append(new_task)
    db.session.commit()

    # Pinea primeras listas del primer usuario
    first_user = users[0]
    for list_ in lists[:2]:
        pin = Pinned(
            user_id=first_user.id,
            list_id=list_.id,
            created_at=datetime.now(timezone.utc),
        )
        db.session.add(pin)
    db.session.commit()

    print("Seeder ejecutado correctamente.")
