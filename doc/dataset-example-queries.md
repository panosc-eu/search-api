# Dataset queries

`GET /datasets`

## Query datasets acquired using X-Ray Absorption:

```json
{
    "where": {
        "techniques.name": "X-Ray Absorption"
    }
}
```

Returns:

```json
[
    {
        "pid": "20.500.12269/panosc2",
        "isPublic": true,
        "title": "PaNOSC test data",
        "creationDate": "2020-03-10T22:00:00.000Z",
        "parameters": [
            {
                "name": "chemical_formula",
                "value": "V",
                "unit": ""
            }
        ],
        "samples": [
            {
                "name": "Vanadium in a container"
            }
        ],
        "techniques": [
            {
                "pid": "20.500.12269/panoscTech1",
                "name": "X-Ray Absorption"
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

## Query datasets where the photon energy range is 880-990 eV:

```json
{
    "where": {
        "and": [
            {
                "variable": "photon_energy",
                "operator": "gt",
                "value": 880,
                "unit": "eV"
            },
            {
                "variable": "photon_energy",
                "operator": "lt",
                "value": 990,
                "unit": "eV"
            }
        ]
    }
}
```

Returns:

```json
[
    {
        "pid": "20.500.12269/panosc3",
        "isPublic": true,
        "title": "PaNOSC test data",
        "creationDate": "2020-03-10T22:00:00.000Z",
        "parameters": [
            {
                "name": "photon_energy",
                "value": 930,
                "unit": "eV"
            },
            {
                "name": "temperature",
                "value": 20,
                "unit": "celsius"
            }
        ],
        "samples": [
            {
                "name": "Vanadium in a container"
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

## Query datasets with a solid sample containing copper:

```json
{
    "where": {
        "and": [
            {
                "variable": "sample_state",
                "operator": "eq",
                "value": "solid"
            },
            {
                "variable": "chemical_formula",
                "operator": "eq",
                "value": "Cu"
            }
        ]
    }
}
```

Returns:

```json
[
    {
        "pid": "20.500.12269/panosc1",
        "isPublic": true,
        "title": "PaNOSC test data",
        "creationDate": "2020-03-10T22:00:00.000Z",
        "parameters": [
            {
                "name": "chemical_formula",
                "value": "Cu",
                "unit": ""
            },
            {
                "name": "sample_state",
                "value": "solid",
                "unit": ""
            }
        ],
        "samples": [
            {
                "name": "Solid copper cylinder"
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

## Query datasets where temperature is below 80°C:

```json
{
    "where": {
        "query": {
            "variable": "temperature",
            "operator": "lt",
            "value": 80,
            "unit": "celsius"
        }
    }
}
```

Returns:

```json
[
    {
        "pid": "20.500.12269/panosc3",
        "isPublic": true,
        "title": "PaNOSC test data",
        "creationDate": "2020-03-10T22:00:00.000Z",
        "parameters": [
            {
                "name": "photon_energy",
                "value": 930,
                "unit": "eV"
            },
            {
                "name": "temperature",
                "value": 20,
                "unit": "celsius"
            }
        ],
        "samples": [
            {
                "name": "Vanadium in a container"
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
