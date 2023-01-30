migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9ksr8mc7a4plams")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qy6tu9sd",
    "name": "username",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9ksr8mc7a4plams")

  // remove
  collection.schema.removeField("qy6tu9sd")

  return dao.saveCollection(collection)
})
