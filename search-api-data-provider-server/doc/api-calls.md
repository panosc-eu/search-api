# The search API calls

## General remarks

- In a first approach, we define an API without authentication. As a
  consequence, this API will be constraint to the read only access to
  public data. Later on, we will add authentication to allow also
  access to embargoed data and may also consider to allow the creation
  of new datasets.
  
- As the purpose of the API is to find metadata of documents
  (currently publications and proposals) and the datasets that are
  part of these documents, a decision has been made to only expose
  endpoints for documents, datasets and instruments.

---

## Contents

1. [Dataset](#dataset)
   1. [Get dataset](#get-dataset)
   2. [Get dataset files](#get-dataset-files)
   3. [Count dataset files](#count-dataset-files)
   4. [Search datasets](#search-datasets)
   5. [Count datasets](#count-datasets)
2. [Document](#document)
   1. [Get document](#get-document)
   2. [Search documents](#search-documents)
   3. [Count documents](#count-documents)
3. [Instrument](#instrument)
   1. [Get instrument](#get-instrument)
   2. [Search instruments](#search-instruments)
   3. [Count instruments](#count-instruments)

---

## Dataset

### Get dataset

Get a single dataset.

#### Call

`GET /datasets/{pid}`

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Datasets/{pid}?filter={filter}'
```

#### Path parameters

pid
: the pid of the dataset

#### Query parameters

filter:
: a [query](./query.md)

#### Returns

A dataset JSON object as defined in the data model. To include child objects, see [Querying](./query.md) and [Dataset Queries](./dataset-example-queries.md).

```json
{
    "pid": "20.500.12269/panosc-dataset1",
    "title": "PaNOSC Test Dataset 1",
    "isPublic": true,
    "creationDate": "2020-05-05T15:01:02.341Z",
    "documentId": "10.5072/panosc-document1",
    "instrumentId": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71"
}
```

---

### Get dataset files

Get files for a dataset.

#### Call

`GET /datasets/{pid}/files`

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Datasets/20.500.12269%2Fpanosc-dataset1/files?filter={filter}'
```

#### Path parameters

pid
: the pid of the dataset

#### Query parameters

filter:
: a [query](./query.md)

#### Returns

An array of file JSON objects as defined in the data model.

```json
[
    {
        "id": 1,
        "name": "panosc-file1.hdf",
        "datasetId": "20.500.12269/panosc-dataset1"
    }
]
```

---

### Count dataset files

Get number of files for a dataset.

#### Call
`GET /datasets/{pid}/files/count`

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Datasets/{pid}/files/count?where={where}'
```

#### Path parameters

pid
: the pid of the dataset

#### Query parameters

where:
: a [where query](./query.md#where-filter)

#### Returns

A JSON object.

```json
{
    "count": 1
}
```

---

### Search datasets

Search for datasets.

#### Call

`GET /datasets`

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Datasets?filter={filter}'
```

#### Query parameters

filter
: a [query](./query.md)

#### Returns

An array of dataset JSON objects as defined in the data model. To include child objects, see [Querying](./query.md) and [Dataset Queries](./dataset-example-queries.md).

```json
[
    {
        "pid": "20.500.12269/panosc-dataset1",
        "title": "PaNOSC Test Dataset 1",
        "isPublic": true,
        "creationDate": "2020-05-05T15:01:02.341Z",
        "score": 0,
        "documentId": "10.5072/panosc-document1",
        "instrumentId": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71"
    },
    {
        "pid": "20.500.12269/panosc-dataset2",
        "title": "PaNOSC Test Dataset 2",
        "isPublic": true,
        "score": 0,
        "creationDate": "2020-05-05T15:01:02.341Z",
        "documentId": "10.5072/panosc-document1",
        "instrumentId": "20.500.12269/125e8172-d0f4-4547-98be-a9db903a6269"
    }
]
```

---

### Count datasets

Get number of datasets.

#### Call

`GET /datasets/count`

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Datasets/count?where={where}'
```

#### Query parameters

where
: a [where query](./query.md#where-filter)

#### Returns

```json
{
    "count": 4
}
```

---

## Document

### Get document

Get a single document.

#### Call

`GET /documents/{pid}`

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Documents/{pid}?filter={filter}'
```

#### Path parameters

pid
: the pid of the document

#### Query parameters

filter
: a [query](./query.md)

#### Returns

A document JSON object as defined in the data model. To include child objects, see [Querying](./query.md) and [Document Queries](./document-example-queries.md).

```json
{
    "pid": "10.5072/panosc-document1",
    "isPublic": true,
    "type": "publication",
    "title": "PaNOSC Test Publication"
}
```
---

### Search documents

Search for documents.

#### Call

`GET /documents`

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Documents?filter={filter}'
```

#### Query parameters

filter
: a [query](./query.md)

#### Returns

An array of document JSON objects as defined in the data model. To include child objects, see [Querying](./query.md) and [Document Queries](./document-example-queries.md).

```json
[
    {
        "pid": "10.5072/panosc-document1",
        "isPublic": true,
        "type": "publication",
        "title": "PaNOSC Test Publication",
        "score": 0
    },
    {
        "pid": "10.5072/panosc-document2",
        "isPublic": true,
        "type": "proposal",
        "title": "PaNOSC Test Proposal",
        "score": 0
    }
]
```

---

### Count documents

Get number of documents.

#### Call

`GET /documents/count`

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Documents/count?where={where}'
```

#### Query parameters

where
: a [where query](./query.md#where-filter)

#### Returns

```json
{
    "count": 2
}
```

---

## Instrument

### Get instrument

Get a single instrument.

#### Call

`GET /instruments/{pid}`

```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Instruments/{pid}?filter={filter}'
```

#### Path parameters

pid
: the pid of the instrument

#### Query parameters

filter
: a [query](./query.md)

#### Returns

An instrument JSON object as defined in the data model.

```json
{
    "pid": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71",
    "name": "LoKI",
    "facility": "ESS"
}
```

---

### Search instruments

Search for instruments.

#### Call

`GET /instruments`

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Instruments?filter={filter}'
```

#### Query parameters

filter
: a [query](./query.md)

#### Returns

An array of instrument JSON objects as defined in the data model.

```json
[
    {
        "pid": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71",
        "name": "LoKI",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/125e8172-d0f4-4547-98be-a9db903a6269",
        "name": "ODIN",
        "facility": "ESS",
        "score": 0
    }
]
```

---

### Count instruments

Get number of instruments.

#### Call

`GET /instruments/count`

#### Curl
```sh
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Instruments/count?where={where}'
```

#### Query parameters

where
: a [where query](./query.md#where-filter)

#### Returns

```json
{
    "count": 15
}
```
