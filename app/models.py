from datetime import datetime
from app import db


class Activities(db.Model):
    __tablename__ = 'user_activities'
    _id = db.Column(db.Integer, primary_key=True)
    _filename = db.Column(db.Text, index=False, unique=False, nullable=True)
    _upload = db.Column(db.Text, index=False, unique=False, nullable=True)
    _timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    _type = db.Column(db.String(10), index=False, unique=False, nullable=False)

    def __repr__(self):
        return '<Activities {}>'.format(self._id)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)  


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Post {}>'.format(self.body)