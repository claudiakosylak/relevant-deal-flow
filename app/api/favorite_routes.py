from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Favorite, Startup

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('/<int:id>', methods=["POST"])
@login_required
def add_favorite(id):
    """
    Favorites a startup by startup ID
    """
    favorite = Favorite(
        user_id=current_user.id,
        startup_id=id
    )
    db.session.add(favorite)
    db.session.commit()
    return favorite.to_dict()

@favorite_routes.route("/")
@login_required
def get_favorites():
    """
    Get a list of all startups favorited by current user
    """
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    result = []
    for favorite in favorites:
        startup = Startup.query.filter(Startup.id == favorite.startup_id).to_dict()
        startup['date_favorited'] = favorite.created_at
        result.append(startup)
    return {'startups': result}
