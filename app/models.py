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
