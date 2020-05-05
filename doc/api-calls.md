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
   3. [Search datasets](#search-datasets)
2. [Document](#document)
   1. [Get document](#get-document)
   2. [Search documents](#search-documents)
3. [Instrument](#instrument)
   1. [Get instrument](#get-instrument)
   2. [Search instruments](#search-instruments)

---

## Dataset

### Get dataset

Get a single dataset.

#### Call

`GET /datasets/{pid}`

#### Curl
```sh
curl -X GET "http://localhost:3000/datasets/{pid}" -H "accept: application/json"
```

#### Path parameters

pid
: the pid of the dataset

#### Returns

A dataset JSON object as defined in the data model. To include child objects, see [Querying](./query.md) and [Dataset Queries](./dataset-example-queries.md).

```json
{
    "pid": "20.500.12269/0052f856-9615-4f9a-8575-9e180071ff32nicos_00000482.hdf",
    "isPublic": true,
    "title": "Open beam WFM Slits 0.2x25",
    "creationDate": "2019-08-02T12:03:28.000Z"
}
```

---

### Get dataset files

Get files for a dataset.

#### Call

`GET /datasets/{pid}/files`

#### Curl
```sh
curl -X GET "http://localhost:3000/datasets/{pid}/files" -H "accept: application/json"
```

#### Path parameters

pid
: the pid of the dataset

#### Returns

An array of file JSON objects as defined in the data model.

```json
[
    {
        "id": "49rjgro3w30ropur048eog210",
	"name": "nicos_00000743.hdf"
    },
    {
        "id": "fdojg304h3q89pfq98hf3qphf",
	"name": "nicos_00000744.hdf"
    }
]
```

---

### Search datasets

Search for datasets.

#### Call

`GET /datasets`

#### Curl
```sh
curl -X GET "http://localhost:3000/datasets?filter={filter}" -H "accept: application/json"
```

#### Query parameters

filter
: a query

#### Returns

An array of dataset JSON objects as defined in the data model. To include child objects, see [Querying](./query.md) and [Dataset Queries](./dataset-example-queries.md).

```json
[
    {
        "pid": "20.500.12269/0052f856-9615-4f9a-8575-9e180071ff32nicos_00000482.hdf",
        "isPublic": true,
        "title": "Open beam WFM Slits 0.2x25",
        "creationDate": "2019-08-02T12:03:28.000Z",
	"score": 0
    }
]
```

---

## Document

### Get document

Get a single document.

#### Call

`GET /documents/{pid}`

#### Curl
```sh
curl -X GET "http://localhost:3000/documents/{pid}" -H "accept: application/json"
```

#### Path parameters

pid
: the pid of the document

#### Returns

A document JSON object as defined in the data model. To include child objects, see [Querying](./query.md) and [Document Queries](./document-example-queries.md).

```json
{
    "pid": "03dd9804-1b04-4d36-b0fb-cf66e9891e7d",
    "isPublic": true,
    "title": "SANS/Reflectometry",
    "type": "Publication"
}
```
---

### Search documents

Search for documents.

#### Call

`GET /documents`

#### Curl
```sh
curl -X GET "http://localhost:3000/documents?filter={filter}" -H "accept: application/json"
```

#### Query parameters

filter
: a query

#### Returns

An array of document JSON objects as defined in the data model. To include child objects, see [Querying](./query.md) and [Document Queries](./document-example-queries.md).

```json
[
    {
        "pid": "03dd9804-1b04-4d36-b0fb-cf66e9891e7d",
        "isPublic": true,
        "title": "SANS/Reflectometry",
        "type": "Publication",
	"score": 0
    }
]
```

---

## Instrument



### Get instrument

Get a single instrument.

#### Call

`GET /instruments/{pid}`

```sh
curl -X GET "http://localhost:3000/instruments/{pid}" -H "accept: application/json"
```

#### Path parameters

pid
: the pid of the instrument

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
curl -X GET "http://localhost:3000/instruments?filter={filter}" -H "accept: application/json"
```

#### Query parameters

filter
: a query

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
