from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, func, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone
import enum

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    photo_url: Mapped[str] = mapped_column(String, nullable=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    #relationships
    lists: Mapped[list["List"]] = relationship(back_populates="user")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "photo_url": self.photo_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at
            # do not serialize the password, its a security breach
        }
    
class ListStatus(enum.Enum): 
    pending = "pending"
    completed = "completed"
    
class List(db.Model):
    __tablename__ = 'lists' 
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    status: Mapped[ListStatus] = mapped_column(Enum(ListStatus), default=ListStatus.pending, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    #relationships
    user: Mapped["User"] = relationship(back_populates="lists")
    tasks: Mapped[list["Task"]] = relationship(back_populates="list")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "status": self.status.value,
            "tasks": [task.serialize() for task in self.tasks],
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class TaskStatus(enum.Enum): 
    pending = "pending"
    completed = "completed"
    
class Task(db.Model):
    __tablename__ = 'tasks' 
    id: Mapped[int] = mapped_column(primary_key=True)
    task: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    list_id: Mapped[int] = mapped_column(ForeignKey('lists.id'), nullable=False)
    status: Mapped[TaskStatus] = mapped_column(Enum(TaskStatus), default=TaskStatus.pending, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    #relationships
    list: Mapped["List"] = relationship(back_populates="tasks")

    def serialize(self):
        return {
            "id": self.id,
            "task": self.task,
            "list_id": self.list_id,
            "status": self.status.value,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }