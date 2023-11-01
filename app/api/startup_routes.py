from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Startup
from app.forms import UploadDeckForm
from app.api.AWS_helpers import (
    upload_file_to_s3, get_unique_filename)

startup_routes = Blueprint('startups', __name__)

@startup_routes.route('/owned')
@login_required
def user_startups():
    """
    Query for all startups owned by the current logged in user and returns them in a list of dictionaries
    """
    startups = Startup.query.filter(Startup.user_id == current_user.id).all()
    return {'startups': [startup.to_dict() for startup in startups]}

@startup_routes.route('/<int:id>')
def startup(id):
    """
    Query for a specific startup by startup id in a dictionary
    """
    startup = Startup.query.get(id)
    return startup.to_dict()


@startup_routes.route('/')
def startups():
    """
    Query for all startups and returns them in a list of startup dictionaries
    """
    startups = Startup.query.all()
    return {'startups': [startup.to_dict() for startup in startups]}

@startup_routes.route('', methods=["POST"])
@login_required
def upload_deck():
    """
    Uploads a deck and creates a record for the startup
    """
    form = UploadDeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        file = form.data["deck"]
        file.filename = get_unique_filename(file.filename)
        upload = upload_file_to_s3(file)

        if "url" not in upload:
            return {"errors": "file error"}

        startup = Startup(
            name=form.data['name'],
            description=form.data['description'],
            website=form.data['website'],
            deck=form.data['deck'],
            founder_1=form.data['founder_1'],
            founder_2=form.data['founder_2'],
            founder_3=form.data['founder_3'],
            user_id=current_user.id
        )
        db.session.add(startup)
        db.session.commit()
        return startup.to_dict()
    return {'errors': form.errors}, 401
