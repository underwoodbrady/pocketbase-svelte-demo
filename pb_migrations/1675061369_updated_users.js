migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o75wnwh9",
    "name": "bio",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 8,
      "max": 128,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o75wnwh9",
    "name": "bio",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 16,
      "max": 128,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
