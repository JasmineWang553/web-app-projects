from flask_restful import Resource, reqparse
from flask import request
from models.store_model import StoreModel

class Store(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
        type=str,
        required=True,
        help="store name cannot be blank!"
    )

    def get(self, name):
        store = StoreModel.find_by_name(name)

        if not store:
            return {"message": "store not found"}
    
        return store.json()

    def post(self, name):
        store = StoreModel.find_by_name(name=name)

        if not store:
            store = StoreModel(name)
            store.save_to_db()

            return store.json()
        else:
            return {"message": "store already in db"}

    def delete(self, name):
        store = StoreModel.find_by_name(name)
        store.delete_from_db()

        return {"message": "store is deleted"}

    def put(self, name):
        store = StoreModel.find_by_name(name)
        data = self.parser.parse_args()

        try:
            if store:
                store.name = data['name']
                store.save_to_db()
            else:
                store = StoreModel(name, **data)

            store.save_to_db()
            return store.json()
        except:
            return {"message": "error happened when updating"}

class StoreList(Resource):
    def get(self):
        return {"stores": list(map(lambda x: x.json(), StoreModel.query.all()))}
    