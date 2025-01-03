# Apollo GraphQL Sample

Tutorial: https://www.apollographql.com/docs/apollo-server/getting-started


## Run

```
npm start
```

visit: http://localhost:4000/

## Sample data

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
  }
  books {
    title
    author
  }

  numberSeven
  numberSix
}
```

Variables
```json
{
  "id": "1"
}
```

Response

```json
{
  "data": {
    "user": {
      "id": "1",
      "name": "Elizabeth Bennet"
    },
    "books": [
      {
        "title": "The Awakening",
        "author": "Kate Chopin"
      },
      {
        "title": "City of Glass",
        "author": "Paul Auster"
      }
    ],
    "numberSeven": 7,
    "numberSix": 6
  }
}
```