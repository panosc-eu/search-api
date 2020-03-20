# The search API calls

## General remarks

- In a first approach, we define an API without authentication. As a
  consequence, this API will be constraint to the read only access to
  public data. Later on, we will add authentication to allow also
  access to embargoed data and may also consider to allow the creation
  of new datasets.

---

## Dataset

### Get dataset

Get a single dataset.

#### Call

`GET /datasets/{id}`

#### Path parameters

id
: the id of the dataset

#### Returns

A dataset JSON object as defined in the data model, including child objects, e.g. Samples, Instrument, Files and Parameters

```js
  {
    "pid": "20.500.12269/0052f856-9615-4f9a-8575-9e180071ff32nicos_00000482.hdf",
    "isPublic": true,
    "title": "Open beam WFM Slits 0.2x25",
    "creationDate": "2019-08-02T12:03:28.000Z",
    "size": 0,
    "parameters": [
      {
        "name": "sample_temperature",
        "value": 0,
        "unit": "C"
      },
      {
        "name": "size",
        "value": 0,
        "unit": "bytes"
      }
    ],
    "samples": [],
    "techniques": [],
    "instrument": {
      "pid": "11",
      "name": "a"
    },
    "files": []
  }
```

---

### Search datasets

Search for datasets.

#### Call

`GET /datasets`

#### Query parameters

filter
: a query

#### Returns

A list of datasets.


```js
[
  {
    "pid": "20.500.12269/0052f856-9615-4f9a-8575-9e180071ff32nicos_00000482.hdf",
    "isPublic": true,
    "title": "Open beam WFM Slits 0.2x25",
    "creationDate": "2019-08-02T12:03:28.000Z",
    "size": 0,
    "parameters": [
      {
        "name": "sample_temperature",
        "value": 0,
        "unit": "C"
      },
      {
        "name": "size",
        "value": 0,
        "unit": "bytes"
      }
    ],
    "samples": [],
    "techniques": [],
    "instrument": {
      "pid": "11",
      "name": "a"
    },
    "files": []
  }
]
```

---

## Document



### Get document

Get a single document.

#### Call

`GET /documents/{id}`

#### Path parameters

id
: the id of the document

#### Returns

The document
```js
  {
    "pid": "03dd9804-1b04-4d36-b0fb-cf66e9891e7d",
    "title": "SANS/Reflectometry",
    "summary": "SANS/Reflectometry",
    "type": "Publication",
    "startDate": "2020-01-03T19:38:34.203Z",
    "endDate": "2020-01-03T19:38:34.203Z",
    "releaseDate": "2020-01-03T19:38:34.203Z",
    "license": "CC-BY-4.0",
    "datasets": []
  }
```
---

### Search documents

Search for documents.

#### Call

`GET /documents`

#### Query parameters

filter
: a query

#### Returns

An array of documents.


```js
[
  {
    "pid": "03dd9804-1b04-4d36-b0fb-cf66e9891e7d",
    "title": "SANS/Reflectometry",
    "summary": "SANS/Reflectometry",
    "type": "Publication",
    "startDate": "2020-01-03T19:38:34.203Z",
    "endDate": "2020-01-03T19:38:34.203Z",
    "releaseDate": "2020-01-03T19:38:34.203Z",
    "license": "CC-BY-4.0",
    "datasets": []
  }
]
```

---

## Instrument



### Get instrument

Get a single instrument.

#### Call

`GET /instruments/{id}`

#### Path parameters

id
: the id of the instrument

#### Returns

The instrument

---

### Search instruments

Search for instruments.

#### Call

`GET /instruments`

#### Query parameters

filter
: a query

#### Returns

A list of instruments.

---

## Sample




### Get sample

Get a single sample.

#### Call

`GET /samples/{id}`

#### Path parameters

id
: the id of the sample

#### Returns

The sample

---

### Search samples

Search for samples.

#### Call

`GET /samples`

#### Query parameters

filter
: a query

#### Returns

A list of samples.
