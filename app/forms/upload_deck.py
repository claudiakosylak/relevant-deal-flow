from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError

class UploadDeckForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    website = StringField('website', validators=[DataRequired()])
    deck = StringField('deck', validators=[DataRequired()])
    founder_1 = StringField('founder_1', validators=[DataRequired()])
    founder_2 = StringField('founder_1', validators=[DataRequired()])
    founder_3 = StringField('founder_1', validators=[DataRequired()])
