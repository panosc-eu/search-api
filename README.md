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

4. Optionally scoring can be enabled by setting to true the environmental variable PSS_ENABLED and providing the service url in PSS_BASE_URL

   ```bash
   export PSS_ENABLED=1
   export PSS_BASE_URL=<the URL of the deployed PaNOSC scoring service>
   ```

   ([PaNOSC Search Score](https://github.com/panosc-eu/panosc-search-scoring))

5. Optionally enable PaNET ontology fetching from an external URL (if this step is skipped no PaNET ontology is used)

   ```bash
   export PANET_BASE_URL=<the URL of the deployed pan-ontologies-api service>
   ```

   ([pan-ontologies-api source code and container](https://github.com/ExPaNDS-eu/pan-ontologies-api))

6. Try out the API using the example queries, either through http://localhost:3000/explorer or Curl.

   - [Dataset Example Queries](./doc/dataset-example-queries.md)
   - [Document Example Queries](./doc/document-example-queries.md)
   - [Instrument Example Queries](./doc/instrument-example-queries.md)

## Acceptance and integration tests

```bash
npm test
```
