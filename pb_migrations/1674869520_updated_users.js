migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o75wnwh9",
    "name": "bio",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 16,
      "max": 128,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xvnyhysy",
    "name": "followers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jfn2ary3",
    "name": "following",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("o75wnwh9")

  // remove
  collection.schema.removeField("xvnyhysy")

  // remove
  collection.schema.removeField("jfn2ary3")

  return dao.saveCollection(collection)
})
