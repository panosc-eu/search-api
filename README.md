# Federated Photon and Neutron Search Api

## Documentation

[Architecture](https://confluence.panosc.eu/display/wp3/Search+aggregation) of search API system.


## Prerequisites

- npm >= 6
- node >= 8

## How to use the Federated Photon and Neutron search api

1. Clone the repository

   ```bash
   git clone -b dev/federated_search_api https://github.com/panosc-eu/search-api.git
   ```

2. Start docker stack

   ```bash
   docker-compose -f docker-compose-test.yaml up --build
   ```

3. Try out the API using the example queries, either through http://localhost:3000/explorer or Curl.

   - [Dataset Example Queries](./doc/dataset-example-queries.md)
   - [Document Example Queries](./doc/document-example-queries.md)
   - [Instrument Example Queries](./doc/instrument-example-queries.md)

