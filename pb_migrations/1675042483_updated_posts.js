migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  // remove
  collection.schema.removeField("agj5zglf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ffyxlax7",
    "name": "likes",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
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

  // remove
  collection.schema.removeField("ffyxlax7")

  return dao.saveCollection(collection)
})
