from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp
from app.models import Startup
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

def website_exists(form, field):
    site = field.data
    startup = Startup.query.filter(Startup.website == site).first()
    if startup:
        raise ValidationError("Website is already registered.")

class UploadDeckForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message="Please enter a name for your startup."), Length(min=3, max=40, message="Startup name must be between 3 and 40 characters long.")])
    description = StringField('description', validators=[DataRequired(message="Please enter a description for your startup."), Length(min=30, max=500, message="Description must be between 30 and 500 characters long.")])
    website = StringField('website', validators=[website_exists])
    deck = FileField('deck', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    founder_1 = StringField('founder_1', validators=[DataRequired(message="Please enter at least one founder name."), Length(min=5, max=100, message="Founder name must be between 5 and 100 characters long.")])
    founder_2 = StringField('founder_2')
    founder_3 = StringField('founder_3')
