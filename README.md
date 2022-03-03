# Photon and Neutron Search Api

## Documentation

- [Data Model](./doc/data-model.md)
- [API Calls](./doc/api-calls.md)
- [Querying](./doc/query.md)
- [Units and Prefixes](./doc/units-and-prefixes.md)
- [List of Roles](./doc/list-of-roles.md)
- [List of Techniques](./doc/list-of-techniques.md)

## Prerequisites

- npm >= 6
- node >= 8

## How to use the Photon and Neutron search api

1. Clone the repository

   ```bash
   git clone https://github.com/panosc-eu/search-api.git
   ```

2. Install node packages

   ```bash
   npm install
   ```

3. Start the server

   ```bash
   npm start
   ```

4. Try out the API using the example queries, either through http://localhost:3000/explorer or Curl.

   - [Dataset Example Queries](./doc/dataset-example-queries.md)
   - [Document Example Queries](./doc/document-example-queries.md)
   - [Instrument Example Queries](./doc/instrument-example-queries.md)
   

## Acceptance and integration tests

```bash
npm test
```
