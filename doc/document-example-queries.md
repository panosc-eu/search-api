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
            "relation": "datasets"
        },
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
                                "fullName": "James Chadwick"
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
        "pid": "10.5072/panosc-document2",
        "type": "proposal",
        "isPublic": true,
        "title": "PaNOSC Test Proposal",
        "score": 0,
        "datasets": [
            {
                "pid": "20.500.12269/panosc-dataset3",
                "title": "PaNOSC Test Dataset 3",
                "isPublic": true,
                "documentId": "10.5072/panosc-document2",
                "instrumentId": "20.500.12269/f0637030-9f89-4398-8f01-09211145efa1"
            },
            {
                "pid": "20.500.12269/panosc-dataset4",
                "title": "PaNOSC Test Dataset 4",
                "isPublic": true,
                "documentId": "10.5072/panosc-document2",
                "instrumentId": "20.500.12269/d3dd2880-637a-40b5-9815-990453817f0e"
            }
        ],
        "members": [
            {
                "id": 3,
                "role": "principal investigator",
                "documentId": "10.5072/panosc-document2",
                "personId": "panosc-person2",
                "affiliationId": 1,
                "person": {
                    "id": "panosc-person2",
                    "fullName": "James Chadwick"
                }
            }
        ]
    }
]
```

### Query documents where wavelength is 1000-1100 nm

```json
{
    "include": [
        {
            "relation": "parameters",
            "scope": {
                "where": {
                    "and": [
                        {
                            "name":"wavelength"
                        },
                        {
                            "value": {
                                "between": [1000, 1100]
                            }
                        },
                        {
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
        "pid": "10.5072/panosc-document1",
        "type": "publication",
        "isPublic": true,
        "title": "PaNOSC Test Publication",
        "score": 0,
        "parameters": [
            {
                "id": 6,
                "name": "wavelength",
                "value": 1064,
                "unit": "nm",
                "documentId": "10.5072/panosc-document1"
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
                "include": [
                    {
                        "relation": "parameters",
                        "scope": {
                            "where": {
                                "and": [
                                    {
                                        "name": "wavelength"
                                    },
                                    {
                                        "value": {
                                            "between": [1000,1100]
                                        }
                                    },
                                    {
                                        "unit": "nm"
                                    }
                                ]
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
        "pid": "10.5072/panosc-document2",
        "type": "proposal",
        "isPublic": true,
        "title": "PaNOSC Test Proposal",
        "score": 0,
        "datasets": [
            {
                "pid": "20.500.12269/panosc-dataset4",
                "title": "PaNOSC Test Dataset 4",
                "isPublic": true,
                "documentId": "10.5072/panosc-document2",
                "instrumentId": "20.500.12269/d3dd2880-637a-40b5-9815-990453817f0e",
                "parameters": [
                    {
                        "id": 5,
                        "name": "wavelength",
                        "value": 1064,
                        "unit": "nm",
                        "datasetId": "20.500.12269/panosc-dataset4"
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
                        "relation": "datasetSamples",
                        "scope": {
                            "include": [
                                {
                                    "relation": "sample",
                                    "scope": {
                                        "where": {
                                            "name": "Solid copper cylinder"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "relation": "datasetTechniques",
                        "scope": {
                            "include": [
                                {
                                    "relation": "technique",
                                    "scope": {
                                        "where": {
                                            "name": "x-ray absorption"
                                        }
                                    }
                                }
                            ]
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
        "pid": "10.5072/panosc-document2",
        "type": "proposal",
        "isPublic": true,
        "title": "PaNOSC Test Proposal",
        "score": 0,
        "datasets": [
            {
                "pid": "20.500.12269/panosc-dataset3",
                "title": "PaNOSC Test Dataset 3",
                "isPublic": true,
                "documentId": "10.5072/panosc-document2",
                "instrumentId": "20.500.12269/f0637030-9f89-4398-8f01-09211145efa1",
                "datasetSamples": [
                    {
                        "id": 1,
                        "datasetId": "20.500.12269/panosc-dataset3",
                        "sampleId": "20.500.12269/panosc-sample1",
                        "sample": {
                            "name": "Solid copper cylinder",
                            "pid": "20.500.12269/panosc-sample1"
                        }
                    }
                ],
                "datasetTechniques": [
                    {
                        "id": 3,
                        "datasetId": "20.500.12269/panosc-dataset3",
                        "techniqueId": "20.500.12269/panosc-tech2",
                        "technique": {
                            "pid": "20.500.12269/panosc-tech2",
                            "name": "x-ray absorption"
                        }
                    }
                ]
            },
            {
                "pid": "20.500.12269/panosc-dataset4",
                "title": "PaNOSC Test Dataset 4",
                "isPublic": true,
                "documentId": "10.5072/panosc-document2",
                "instrumentId": "20.500.12269/d3dd2880-637a-40b5-9815-990453817f0e",
                "datasetSamples": [
                    {
                        "id": 1,
                        "datasetId": "20.500.12269/panosc-dataset4",
                        "sampleId": "20.500.12269/panosc-sample1",
                        "sample": {
                            "name": "Solid copper cylinder",
                            "pid": "20.500.12269/panosc-sample1"
                        }
                    }
                ],
                "datasetTechniques": [
                    {
                        "id": 4,
                        "datasetId": "20.500.12269/panosc-dataset4",
                        "techniqueId": "20.500.12269/panosc-tech2",
                        "technique": {
                            "pid": "20.500.12269/panosc-tech2",
                            "name": "x-ray absorption"
                        }
                    }
                ]
            }
        ]
    }
]
```
