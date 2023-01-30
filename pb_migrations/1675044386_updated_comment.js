migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9ksr8mc7a4plams")

  collection.name = "comments"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9ksr8mc7a4plams")

  collection.name = "comment"

  return dao.saveCollection(collection)
})
