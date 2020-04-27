# The search API calls

## General remarks

- In a first approach, we define an API without authentication. As a
  consequence, this API will be constraint to the read only access to
  public data. Later on, we will add authentication to allow also
  access to embargoed data and may also consider to allow the creation
  of new datasets.

---

## Contents

1. [Dataset](#dataset)
   1. [Get dataset](#get-dataset)
   2. [Search datasets](#search-datasets)
2. [Document](#document)
   1. [Get document](#get-document)
   2. [Search documents](#search-documents)
3. [Instrument](#istrument)
   1. [Get instrument](#get-instrument)
   2. [Search instruments](#search-instruments)

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

```json
{
    "pid": "20.500.12269/0052f856-9615-4f9a-8575-9e180071ff32nicos_00000482.hdf",
    "isPublic": true,
    "title": "Open beam WFM Slits 0.2x25",
    "creationDate": "2019-08-02T12:03:28.000Z",
    "parameters": [
        {
            "name": "sample_temperature",
            "value": 0,
            "unit": "celsius"
        },
        {
            "name": "chemical_formula",
            "value": "V",
            "unit": ""
        }
    ],
    "samples": [
        {
            "description": "Vanadium in a container"
        }
    ],
    "techniques": [
        {
            "pid": "20.500.12269/0002842",
            "name": "small-angle neutron scattering"
        }
    ],
    "instrument": {
        "pid": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71",
        "name": "LoKI",
        "facility": "ESS"
    }
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

An array of dataset JSON objects as defined in the data model, including child objects, e.g. Samples, Instrument, Files and Parameters


```json
[
    {
        "pid": "20.500.12269/0052f856-9615-4f9a-8575-9e180071ff32nicos_00000482.hdf",
        "isPublic": true,
        "title": "Open beam WFM Slits 0.2x25",
        "creationDate": "2019-08-02T12:03:28.000Z",
        "parameters": [
            {
                "name": "sample_temperature",
                "value": 0,
                "unit": "celsius"
            },
            {
                "name": "chemical_formula",
                "value": "V",
                "unit": ""
            }
        ],
        "samples": [
            {
                "description": "Vanadium in a container"
            }
        ],
        "techniques": [
            {
                "pid": "20.500.12269/0002842",
                "name": "small-angle neutron scattering"
            }
        ],
        "instrument": {
            "pid": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71",
            "name": "LoKI",
            "facility": "ESS"
        }
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
```json
{
    "pid": "03dd9804-1b04-4d36-b0fb-cf66e9891e7d",
    "isPublic": true,
    "title": "SANS/Reflectometry",
    "type": "Publication",
    "datasets": [
        {
            "pid": "20.500.12269/0052f856-9615-4f9a-8575-9e180071ff32nicos_00000482.hdf",
            "isPublic": true,
            "title": "Open beam WFM Slits 0.2x25",
            "creationDate": "2019-08-02T12:03:28.000Z"
        }
    ],
    "members": [
        {
            "role": "prinicipal investigator",
            "person": {
                "id": "030fj3fj20fh",
                "fullname": "James Chadwick"
            }
        }
    ],
    "parameters": [
        {
            "name": "sample_temperature",
            "value": 0,
            "unit": "C"
        },
        {
            "name": "chemical_formula",
            "value": "V",
            "unit": ""
        }
    ]
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

An array of Document JSON objects as defined in the data model, including child objects, e.g. Datasets, Members and Parameters


```json
[
    {
        "pid": "03dd9804-1b04-4d36-b0fb-cf66e9891e7d",
        "isPublic": true,
        "title": "SANS/Reflectometry",
        "type": "Publication",
        "datasets": [
            {
                "pid": "20.500.12269/0052f856-9615-4f9a-8575-9e180071ff32nicos_00000482.hdf",
                "isPublic": true,
                "title": "Open beam WFM Slits 0.2x25",
                "creationDate": "2019-08-02T12:03:28.000Z"
            }
        ],
        "members": [
            {
                "role": "prinicipal investigator",
                "person": {
		    "id": "030fj3fj20fh",
                    "fullname": "James Chadwick"
                }
            }
        ],
        "parameters": [
            {
                "name": "sample_temperature",
                "value": 0,
                "unit": "C"
            },
            {
                "name": "chemical_formula",
                "value": "V",
                "unit": ""
            }
        ]
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
