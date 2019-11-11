# Photon and Neutron Search Api


## How to use the Photon and Neutron search api

1. Clone the repository

  ```bash
  git clone git@github.com:panosc-eu/search-api.git
  ```

2. Install node packages

  ```bash
  npm install
  ```

3. Start the server

```bash
npm start
```

4. To search for e.g. all datasets where pressure is greater than 50

```bash
curl -g -X GET "http://localhost:3000/datasets?filter[where][pressure.value][gt]=50&filter[limit]=10&filter[skip]=0" -H "accept: application/json"
```
