# Dataset queries

`GET /datasets`

## Contents
1. [Query datasets acquired using X-Ray Absorption](#query-datasets-acquired-using-x-ray-absorption)
2. [Query datasets where the photon energy range is 880-990 eV](#query-datasets-where-the-photon-energy-range-is-880-990-ev)
3. [Query datasets with a solid sample containing copper](#query-datasets-with-a-solid-sample-containing-copper)
4. [Query datasets where temperature is below 80°C](#query-datasets-where-temperature-is-below-80c)

## Examples

### Query datasets acquired using X-Ray Absorption

```json
{
    "include": [
        {
            "relation": "datasetTechniques",
            "scope": {
                "include": [
                    {
                        "relation": "technique",
                        "scope": {
                            "where": {
                                "name": "small-angle neutron scattering"
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
        "pid": "20.500.12269/panosc-dataset1",
        "title": "PaNOSC Test Dataset 1",
        "isPublic": true,
        "score": 0,
        "documentId": "10.5072/panosc-document1",
        "instrumentId": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71",
        "datasetTechniques": [
            {
                "id": 1,
                "datasetId": "20.500.12269/panosc-dataset1",
                "techniqueId": "20.500.12269/panosc-tech1",
                "technique": {
                    "pid": "20.500.12269/panosc-tech1",
                    "name": "small-angle neutron scattering"
                }
            }
        ]
    },
    {
        "pid": "20.500.12269/panosc-dataset2",
        "title": "PaNOSC Test Dataset 2",
        "isPublic": true,
        "score": 0,
        "documentId": "10.5072/panosc-document1",
        "instrumentId": "20.500.12269/125e8172-d0f4-4547-98be-a9db903a6269",
        "datasetTechniques": [
            {
                "id": 2,
                "datasetId": "20.500.12269/panosc-dataset2",
                "techniqueId": "20.500.12269/panosc-tech1",
                "technique": {
                    "pid": "20.500.12269/panosc-tech1",
                    "name": "small-angle neutron scattering"
                }
            }
        ]
    }
]
```

### Query datasets where the photon energy range is 880-990 eV

```json
{
    "include": [
        {
            "relation": "parameters",
            "scope": {
                "where": {
                    "and": [
                        {
                            "name": "photon_energy"
                        },
                        {
                            "value": {
                                "between": [880, 990]
                            }
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
        "pid": "20.500.12269/panosc-dataset2",
        "title": "PaNOSC Test Dataset 2",
        "isPublic": true,
        "score": 0,
        "documentId": "10.5072/panosc-document1",
        "instrumentId": "20.500.12269/125e8172-d0f4-4547-98be-a9db903a6269",
        "parameters": [
            {
                "id": 3,
                "name": "photon_energy",
                "value": 930,
                "unit": "eV",
                "datasetId": "20.500.12269/panosc-dataset2"
            }
        ]
    }
]
```

### Query datasets with a solid sample containing copper

```json
{
    "include": [
        {
            "relation": "parameters",
            "scope": {
                "where": {
                    "or": [
                        {
                            "and": [
                                {
                                    "name": "sample_state"
                                },
                                {
                                    "value": "solid"
                                }
                            ]
                        },
                        {
                            "and": [
                                {
                                    "name": "chemical_formula"
                                },
                                {
                                    "value": "Cu"
                                }
                            ]
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
        "pid": "20.500.12269/panosc-dataset1",
        "title": "PaNOSC Test Dataset 1",
        "isPublic": true,
        "score": 0,
        "documentId": "10.5072/panosc-document1",
        "instrumentId": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71",
        "parameters": [
            {
                "id": 1,
                "name": "chemical_formula",
                "value": "Cu",
                "unit": "",
                "datasetId": "20.500.12269/panosc-dataset1"
            },
            {
                "id": 2,
                "name": "sample_state",
                "value": "solid",
                "unit": "",
                "datasetId": "20.500.12269/panosc-dataset1"
            }
        ]
    }
]
```

### Query datasets where temperature is below 80°C

```json
{
    "include": [
        {
            "relation": "parameters",
            "scope": {
                "where": {
                    "and": [
                        {
                            "name": "temperature"
                        },
                        {
                            "value": {
                                "lt": 80
                            }
                        },
                        {
                            "unit": "celsius"
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
        "pid": "20.500.12269/panosc-dataset3",
        "title": "PaNOSC Test Dataset 3",
        "isPublic": true,
        "score": 0,
        "documentId": "10.5072/panosc-document2",
        "instrumentId": "20.500.12269/f0637030-9f89-4398-8f01-09211145efa1",
        "parameters": [
            {
                "id": 4,
                "name": "temperature",
                "value": 20,
                "unit": "celsius",
                "datasetId": "20.500.12269/panosc-dataset3"
            }
        ]
    }
]
```
