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
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True)
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
            "tasks": [{"id": t.id, "task": t.task, "status": t.status.value, "urgent": t.urgent} for t in self.tasks],
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class TaskStatus(enum.Enum): 
    pending = "pending"
    completed = "completed"
    
class Task(db.Model):
    __tablename__ = 'tasks' 
    id: Mapped[int] = mapped_column(primary_key=True)
    list_id: Mapped[int] = mapped_column(ForeignKey('lists.id'), nullable=False)
    task: Mapped[str] = mapped_column(String(255), nullable=False)
    set_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    set_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    location: Mapped[str] = mapped_column(String(255), nullable=True)
    status: Mapped[TaskStatus] = mapped_column(Enum(TaskStatus), default=TaskStatus.pending, nullable=False)
    urgent: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    #relationships
    list: Mapped["List"] = relationship(back_populates="tasks")

    def serialize(self):
        return {
            "id": self.id,
            "list_id": self.list_id,
            "task": self.task,
            "set_date": self.set_date,
            "set_time": self.set_time,
            "locations": self.locations,
            "urgent": self.urgent,
            "status": self.status.value,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }