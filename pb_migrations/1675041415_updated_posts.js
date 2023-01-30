migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "agj5zglf",
    "name": "likes",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  // remove
  collection.schema.removeField("agj5zglf")

  return dao.saveCollection(collection)
})
