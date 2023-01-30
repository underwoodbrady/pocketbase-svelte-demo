migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ydj6fiwb",
    "name": "comments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "9ksr8mc7a4plams",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  // remove
  collection.schema.removeField("ydj6fiwb")

  return dao.saveCollection(collection)
})
