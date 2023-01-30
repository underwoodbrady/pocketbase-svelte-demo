migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  // remove
  collection.schema.removeField("ncvtnkwk")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ncvtnkwk",
    "name": "title",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 4,
      "max": 16,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
