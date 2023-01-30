migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  collection.updateRule = "@request.data.id = null || @request.data.id = id &&\n@request.data.created = null || @request.data.created = created &&\n@request.data.updated = null || @request.data.updated = updated &&\n@request.data.content = null || @request.data.content = content &&\n@request.data.tags = null || @request.data.tags = tags &&\n@request.data.author.username = null || @request.data.author = author.username &&\n@request.data.date = null || @request.data.date = date\n"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
