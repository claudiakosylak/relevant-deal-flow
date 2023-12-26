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

@favorite_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_favorite(id):
    """
    Deletes a favorite by startup ID
    """
    favorite = Favorite.query.filter(Favorite.startup_id == id and Favorite.user_id == current_user.id).first()
    db.session.delete(favorite)
    db.session.commit()
    return {"Success": "Favorite deleted"}

@favorite_routes.route("/")
@login_required
def get_favorites():
    """
    Get a list of all startups favorited by current user
    """
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    result = []
    for favorite in favorites:
        startup = Startup.query.filter(Startup.id == favorite.startup_id).first()
        startup_dict = startup.to_dict()
        startup_dict['date_favorited'] = favorite.created_at
        result.append(startup_dict)
    return {'startups': result}
