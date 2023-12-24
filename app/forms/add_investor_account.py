from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class AddInvestorAccount(FlaskForm):
    company = StringField('company', validators=[DataRequired(), Length(min=3, max=100, message="Company name must be between 3 and 100 characters long.")])
