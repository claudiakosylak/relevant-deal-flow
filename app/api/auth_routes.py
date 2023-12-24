from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import SignUpFormInvestor
from app.forms import AddInvestorAccount
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': form.errors}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup-as-startup', methods=['POST'])
def sign_up():
    """
    Creates a new user as startup and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            email=form.data['email'],
            password=form.data['password'],
            is_startup=True,
            default_startup=True
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401

@auth_routes.route('/signup-as-investor', methods=['POST'])
def sign_up_investor():
    """
    Creates a new user as investor and logs them in
    """
    form = SignUpFormInvestor()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            email=form.data['email'],
            password=form.data['password'],
            is_investor=True,
            investor_company=form.data['investor_company'],
            default_startup=False
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401

@auth_routes.route('/add-investor-account', methods=['PUT'])
@login_required
def add_investor_account():
    """
    Adds an investor account to an existing startup account
    """
    form = AddInvestorAccount()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(current_user.id)
        user.is_investor = True
        user.investor_company = form.data['company']
        user.default_startup = False
        db.session.commit()
        return user.to_dict()
    return form.errors, 401

@auth_routes.route('/switch-account', methods=['PUT'])
@login_required
def switch_account():
    """
    Switches user between startup and investor account as default
    """
    user = User.query.get(current_user.id)
    user.default_startup = not user.default_startup
    db.session.commit()
    return user.to_dict()



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
