from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Startup
from app.forms import UploadDeckForm
from app.api.AWS_helpers import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)

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

@startup_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_startup(id):
    """
    Deletes a startup by startup id.
    """
    startup = Startup.query.get(id)
    image = startup.picture
    image_removal = remove_file_from_s3(image)
    if image_removal != True:
        return {"error": image_removal["errors"]}, 401
    deck = startup.deck
    deck_removal = remove_file_from_s3(deck)
    if deck_removal != True:
        return {"error": deck_removal["errors"]}, 401
    db.session.delete(startup)
    db.session.commit()
    return {"Success": "Startup deleted."}

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

        image = form.data["picture"]
        image.filename = get_unique_filename(image.filename)
        upload_image = upload_file_to_s3(image)

        if ("url" not in upload) or ("url" not in upload_image):
            return {"errors": "file error"}

        startup = Startup(
            name=form.data['name'],
            description=form.data['description'],
            website=form.data['website'],
            email=form.data['email'],
            picture=upload_image["url"],
            deck=upload["url"],
            founder_1=form.data['founder_1'],
            founder_2=form.data['founder_2'],
            founder_3=form.data['founder_3'],
            user_id=current_user.id
        )
        db.session.add(startup)
        db.session.commit()
        return startup.to_dict()
    return {'errors': form.errors}, 401
