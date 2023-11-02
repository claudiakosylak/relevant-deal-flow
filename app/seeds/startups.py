from app.models import db, Startup, environment, SCHEMA
from sqlalchemy.sql import text

def seed_startups():
    startup_1 = Startup(
        name="Awesomely", description="An app for sharing some of the most awesome moments from life", website="awesomely.com", deck="https://images.unsplash.com/photo-1480694313141-fce5e697ee25", founder_1="Demo Lition", founder_2="Betsy Betserson", user_id=1, picture="https://images.unsplash.com/photo-1480694313141-fce5e697ee25"
    )
    startup_2 = Startup(
        name="Ungentrify", description="An app for sharing changes in our local communities and the impact they've made on everyday lives.", website="ungentrify.com", deck="https://images.unsplash.com/photo-1625733247486-c92ad9c79d41", founder_1="Marnie Poo", founder_2="Dave Davidson", founder_3="Pete Peterson", user_id=2, picture="https://images.unsplash.com/photo-1625733247486-c92ad9c79d41"
    )
    startup_3 = Startup(
        name="EatApples", description="An app with all kinds of information about apples.", website="eatapplesapp.com", deck="https://images.unsplash.com/photo-1507260385058-676ee3f043e3", founder_1="Bobbie Robertson", founder_2="Emma Watson", founder_3="George Clooney", user_id=3, picture="https://images.unsplash.com/photo-1507260385058-676ee3f043e3"
    )

    db.session.add(startup_1)
    db.session.add(startup_2)
    db.session.add(startup_3)
    db.session.commit()

def undo_startups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.startups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM startups"))

    db.session.commit()
