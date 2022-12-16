from flask_restful import Resource, reqparse
from flask import request
from models.item_model import ItemModel

class Item(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('price',
        type=float,
        required=True,
        help="Price cannot be blank!"
    )
    parser.add_argument('store_id',
        type=float,
        required=True,
        help="store id cannot be blank!"
    )

    def get(self, name):
        item = ItemModel.find_by_name(name=name)

        if not item:
            return {"message": "item not found"}
    
        return item.json()

    def post(self, name):
        item = ItemModel.find_by_name(name)
        data = self.parser.parse_args()

        if not item:
            item = ItemModel(name, **data)
            item.save_to_db()

            return item.json()
        else:
            return {"message": "item already in db"}

    def delete(self, name):
        item = ItemModel.find_by_name(name)
        item.delete_from_db()

        return {"message": "item is deleted"}

    def put(self, name):
        item = ItemModel.find_by_name(name)
        data = self.parser.parse_args()

        try:
            if item:
                item.price = data['price']
                item.store_id = data['store_id']
            else:
                item = ItemModel(name, **data) #data['price'], data['store_id'])

            item.save_to_db()
            return item.json()

        except:
            return {"message": "error in updating item"}

class ItemList(Resource):
    def get(self):
        return {"items": list(map(lambda x: x.json(), ItemModel.query.all()))}
    