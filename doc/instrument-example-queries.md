# Instrument queries

`GET /instruments`

## Contents
1. [Query instruments by name](#query-instruments-by-name)
2. [Query instruments at a certain facility](#query-instruments-at-a-certain-facility)

## Examples

### Query instruments by name

#### Filter

```json
{
    "where": {
        "name": "LoKI"
    }
}
```

#### Curl

```bash
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Instruments?filter=%7B%22where%22%3A%20%7B%22name%22%3A%20%22LoKI%22%7D%7D'
```

#### Response

```json
[
    {
        "pid": "20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71",
        "name": "LoKI",
        "facility": "ESS",
        "score": 0
    }
]
```

### Query instruments at a certain facility

#### Filter

```json
{
    "where": {
        "facility": "ESS"
    }
}
```

#### Curl

```bash
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Instruments?filter=%7B%22where%22%3A%20%7B%22facility%22%3A%20%22ESS%22%7D%7D'
```

#### Response

```json
[
    {
        "pid": "20.500.12269/07297dd4-557f-4ef6-974f-5c1eec610b9e",
        "name": "ESTIA",
        "facility": "ESS",
        "score": 0
    },
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
    },
    {
        "pid": "20.500.12269/2a120f90-f1fe-4069-90a2-8b1c32bf760a",
        "name": "BEER",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/2a946970-21c5-45cc-b921-b2b020db3ae0",
        "name": "VESPA",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/a8d44b33-5df1-4a01-a910-832d62051e2f",
        "name": "BIFROST",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/b24264c5-c37f-40f7-b2ec-c24c3077f714",
        "name": "MIRACLES",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/d3dd2880-637a-40b5-9815-990453817f0e",
        "name": "HEIMDAL",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/d4ae7284-6659-4403-a192-1c037b9bffc0",
        "name": "DREAM",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/da7552ea-a2db-49e7-9e22-1c3a2e1cf309",
        "name": "T-REX",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/dc746e84-b529-4731-afa6-132ae58d7ee1",
        "name": "MAGiC",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/f0637030-9f89-4398-8f01-09211145efa1",
        "name": "FREIA",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/f1959863-6c2e-494d-a2b5-5e6385acb248",
        "name": "CSPEC",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/f8da8176-28d8-4226-848e-8fd53fda86ef",
        "name": "SKADI",
        "facility": "ESS",
        "score": 0
    },
    {
        "pid": "20.500.12269/f961edb4-b801-46a9-9d6c-180e27b0ccc1",
        "name": "NMX",
        "facility": "ESS",
        "score": 0
    }
]
```
