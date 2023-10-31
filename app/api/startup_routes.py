from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Startup

startup_routes = Blueprint('startups', __name__)

@startup_routes.route('')
def startups():
    """
    Query for all startups and returns them in a list of startup dictionaries
    """
    startups = Startup.query.all()
    return {'startups': [startup.to_dict() for startup in startups]}

@startup_routes.route('/owned')
@login_required
def user_startups():
    """
    Query for all startups owned by the current logged in user and returns them in a list of dictionaries
    """
    startups = Startup.query.filter(Startup.user_id == current_user.id).all()
    return {'startups': [startup.to_dict() for startup in startups]}

# @startup_routes.route('', methods=["POST"])
# @login_required
# def create_startup():
#     """
#     Creates a new startup in the system
#     """
