# Instrument queries

`GET /instruments`

## Contents
1. [Query instruments by name](#query-instruments-by-name)
2. [Query instruments at a certain facility and paginate the results](#query-instruments-at-a-certain-facility-and-paginate-the-results)

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

### Query instruments at a certain facility and paginate the results

#### Filter

```json
{
    "where": {
        "facility": "ESS"
    },
    "skip": 0,
    "limit": 3
}
```
> To get the next three results, set `skip: 3`, then `skip: 6`, and so on.

#### Curl

```bash
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/Instruments?filter=%7B%22where%22%3A%7B%22facility%22%3A%22ESS%22%7D%2C%22skip%22%3A0%2C%22limit%22%3A3%7D'
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
    }
]
```
