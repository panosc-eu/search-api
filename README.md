# Federated Photon and Neutron Search Api

## Documentation

[Architecture](https://confluence.panosc.eu/display/wp3/Search+aggregation) of search API system.


## Prerequisites

- npm >= 6
- node >= 8
- docker environment

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
   
   Curl commands:
   Get all of Datasets and a filtered list of these objects (filter: {"where":{"title":{"like":"Provider 1"}}}) 
   ```bash
   curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Datasets"
   curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Datasets?filter=%7B%22where%22%3A%7B%22title%22%3A%7B%22like%22%3A%22Provider%201%22%7D%7D%7D"
   ```
   
   Get a Dataset object (pid: 20.500.12269/panosc-dataset3)
   ```bash
   curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Datasets/20.500.12269%2Fpanosc-dataset3"
   ```
   
   Get count of Datasets (filter in the second command: {"title":{"like":"Provider 1"}})
   ```bash
   curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Datasets/count"
   curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Datasets/count?where=%7B%22title%22%3A%7B%22like%22%3A%22Provider%201%22%7D%7D"
   ```

## Customization

- [Base adapter](./search-api-data-provider/common/customAdapter.js) for customization.
- [After hook](./search-api-data-provider/common/mixins/score.js) for custom rank computing. The computed score will be used by [aggregator](./search-api/server/aggregator.js) (higher score is better).
