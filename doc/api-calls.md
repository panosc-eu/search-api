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
pid: "xx",
...
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
    pid: "xx",
    ...
    
  }
]
```

---

## Document

### Count documents

Get the number of documents.

#### Call

`GET /documents/count`

#### Query parameters

where
: a query

#### Returns

A number

---

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
    pid: "xx",
    ...
    
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
    pid: "xx",
    ...
    
  }
]
```

---

## Instrument

### Count instruments

Get the number of instruments.

#### Call

`GET /instruments/count`

#### Query parameters

where
: a query

#### Returns

A number

---

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

### Count samples

Get the number of samples.

#### Call

`GET /samples/count`

#### Query parameters

where
: a query

#### Returns

A number

---

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
