# Document queries

`GET /documents`

## Contents
1. [Query documents of type proposal containing my own data](#query-documents-of-type-proposal-containing-my-own-data)
2. [Query documents where wavelength is 1000-1100 nm](#query-documents-where-wavelength-is-1000-1100-nm)
3. [Query documents containing datasets where wavelength is 1000-1100 nm](#query-documents-containing-datasets-where-wavelength-is-1000-1100-nm)
4. [Query documents investigating a particular sample using a certain technique](#query-documents-investigating-a-particular-sample-using-a-certain-technique)

## Examples

### Query documents of type proposal containing my own data

```json
{
    "where": {
        "type": "proposal"
    },
    "include": [
        {
            "relation": "members",
            "scope": {
                "where": {
                    "role": "principal investigator"
                },
                "include": [
                    {
                        "relation": "person",
                        "scope": {
                            "where": {
                                "name": "James Chadwick"
                            }
                        }
                    }
                ]
            }
        },
        {
            "relation": "datasets"
        }
    ]
}
```

Returns:

```json
[
    {
        "pid": "03dd9804-1b04-4d36-b0fb-cf66e9891e7d",
        "isPublic": true,
        "title": "SANS/Reflectometry",
        "type": "Proposal",
        "datasets": [
            {
                "pid": "20.500.12269/0052f856-9615-4f9a-8575-9e180071ff32nicos_00000482.hdf",
                "isPublic": true,
                "title": "Open beam WFM Slits 0.2x25",
                "creationDate": "2019-08-02T12:03:28.000Z"
            },
            {
                "pid": "20.500.12269/0052f856-9615-4f9a-8575-9e180071ff32nicos_00000483.hdf",
                "isPublic": true,
                "title": "Open beam WFM Slits 0.3x25",
                "creationDate": "2019-08-02T12:05:56.000Z"
            }
        ],
        "members": [
            {
                "role": "prinicipal investigator",
                "person": {
                    "id": "59034u0f3fjj3f",
                    "fullname": "James Chadwick"
                }
            }
        ]
    }
]
```

### Query documents where wavelength is 1000-1100 nm

```json
{
    "where": {
        "and": [
            {
                "variable": "wavelength",
                "operator": "gt",
                "value": 1000,
                "unit": "nm"
            },
            {
                "variable": "wavelength",
                "operator": "lt",
                "value": 1100,
                "unit": "nm"
            }
        ]
    }
}
```

Returns:

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
        "parameters": [
            {
                "name": "wavelength",
                "value": 1064,
                "unit": "nm"
            }
        ]
    }
]
```

### Query documents containing datasets where wavelength is 1000-1100 nm

```json
{
    "include": [
        {
            "relation": "datasets",
            "scope": {
                "where": {
                    "and": [
                        {
                            "name": "wavelength",
                            "operator": "gt",
                            "value": 1000,
                            "unit": "nm"
                        },
                        {
                            "name": "wavelength",
                            "operator": "lt",
                            "value": 1100,
                            "unit": "nm"
                        }
                    ]
                }
            }
        }
    ]
}
```

Returns:

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
                "creationDate": "2019-08-02T12:03:28.000Z",
                "parameters": [
                    {
                        "name": "wavelength",
                        "value": 1064,
                        "unit": "nm"
                    }
                ]
            }
        ]
    }
]
```

### Query documents investigating a particular sample using a certain technique

```json
{
    "include": [
        {
            "relation": "datasets",
            "scope": {
                "include": [
                    {
                        "relation": "techniques",
                        "scope": {
                            "where": {
                                "name": "X-Ray Absorption"
                            }
                        }
                    },
                    {
                        "relation": "samples",
                        "scope": {
                            "where": {
                                "name": "Solid copper cylinder"
                            }
                        }
                    }
                ]
            }
        }
    ]
}
```

Returns:

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
                "creationDate": "2019-08-02T12:03:28.000Z",
                "techniques": [
                    {
                        "pid": "20.500.12269/panoscTech1",
                        "name": "X-Ray Absorption"
                    }
                ],
                "samples": [
                    {
                        "name": "Solid copper cylinder"
                    }
                ]
            }
        ]
    }
]
```
