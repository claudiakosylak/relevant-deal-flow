from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Startup(db.Model):
    __tablename__ = 'startups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    website = db.Column(db.String(255), unique=True)
    deck = db.Column(db.String(200))
    founder_1 = db.Column(db.String(100), nullable=False)
    founder_2 = db.Column(db.String(100))
    founder_3 = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship("User", back_populates="startups")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'website': self.website,
            'deck': self.deck,
            'founder_1': self.founder_1,
            'founder_2': self.founder_2,
            'founder_3': self.founder_3,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'user': self.user.to_dict()
        }
