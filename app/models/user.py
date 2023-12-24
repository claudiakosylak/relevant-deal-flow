from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    is_investor = db.Column(db.Boolean, default=False)
    is_startup = db.Column(db.Boolean, default=False)
    investor_company = db.Column(db.String(100))
    default_startup = db.Column(db.Boolean)

    startups = db.relationship("Startup", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'is_investor': self.is_investor,
            'is_startup': self.is_startup,
            'investor_company': self.investor_company,
            'default_startup': self.default_startup
        }
