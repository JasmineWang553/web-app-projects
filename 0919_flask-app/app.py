from flask import Flask, render_template
from flask_restful import Api
from db import db
from sqlalchemy import asc

from resource.item_resource import Item, ItemList
from resource.store_resource import Store, StoreList
from models.item_model import ItemModel
from models.store_model import StoreModel
import os

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db_url = 'postgresql://awpobbizbkmytz:29a200ae555ec1e961dc86e42fbf2ac759a0479c48b6911266be76d0826af17e@ec2-3-214-2-141.compute-1.amazonaws.com:5432/ddchbh19c4vgb1'
# db_url = 'sqlite:///data.db'
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql:///data.db')
app.config['SQLALCHEMY_DATABASE_URI'] = db_url

api = Api(app)

@app.route("/")
def home():
    return render_template("index.html", 
                            items= ItemModel.query.order_by(asc(ItemModel.id)), 
                            stores= StoreModel.query.order_by(asc(StoreModel.id)))

api.add_resource(Item, "/item/<string:name>")
api.add_resource(ItemList, "/items")
api.add_resource(Store, "/store/<string:name>")
api.add_resource(StoreList, "/stores")
db.init_app(app=app)


# with app.app_context():
#     db.create_all()

if __name__ == "__main__":
    @app.before_first_request
    def create_tables():
        db.create_all()
    app.run(threaded=True, debug=True)

