migrate((db) => {
  const collection = new Collection({
    "id": "80z1ldzrusinc5u",
    "created": "2023-01-28 01:43:16.947Z",
    "updated": "2023-01-28 01:43:16.947Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "a7rqurxi",
        "name": "author",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "jcrxnxaw",
        "name": "date",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("80z1ldzrusinc5u");

  return dao.deleteCollection(collection);
})
