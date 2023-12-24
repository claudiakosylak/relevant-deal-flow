from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp
from app.models import User

email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def validate_password(form, field):
    password = field.data
    if not any(char.isdigit() for char in password) or not any(char == "*" or char == "+" or char == "$" or char == "#" or char == "@" for char in password):
        raise ValidationError('Password must contain at least one number and a special character (*, +, $, # or @)')

class SignUpFormInvestor(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists, Regexp(email_pattern, message='Invalid email address')])
    password = StringField('password', validators=[DataRequired(), validate_password, Length(min=8, max=16, message="Password must be between 8 and 16 characters long.")])
    investor_company = StringField('investor_company', validators=[DataRequired(), Length(min=3, max=100, message="Company name must be between 3 and 100 characters long.")])
