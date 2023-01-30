migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9ksr8mc7a4plams")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "author = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9ksr8mc7a4plams")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
