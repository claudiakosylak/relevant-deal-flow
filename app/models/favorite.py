from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    startup_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('startups.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'startup_id': self.startup_id,
            'created_at': self.created_at
        }
