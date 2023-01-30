migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fiqgfkxn",
    "name": "content",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 4,
      "max": 256,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ziiipmqj",
    "name": "tags",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 32,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fiqgfkxn",
    "name": "content",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 16,
      "max": 128,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ziiipmqj",
    "name": "tags",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 4,
      "max": 32,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
