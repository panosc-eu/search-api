# Query Syntax

The query syntax is based on Loopback Where filter (https://loopback.io/doc/en/lb3/Where-filter.html), but with the addition of units

## Inequality operators

A query consists of a JSON object with four properties:

```json
{
    "where": {
        "variable": "sample_temperature",
        "operator": "gt",
        "value": 300,
        "unit": "kelvin"
    }
}
```

Properties:

- `variable` - name of the variable to be filtered
- `operator` - inequalities, gt , lt, eq
- `value` - numerical value for the inequality
- `unit` - string, should be a standard unit as currently defined in js-quantities

https://github.com/gentooboontoo/js-quantities

## Joining Queries

A query can use logical `and` and `or` to join queries together.

## Paging

You can limit the number of queries by adding

```json
{"limit":0}
```

to the filter.
Results can be skipped using the `skip` property

```json
{"skip":0}
```

## Including related models

Related models may be included by using the ```include``` syntax

```json
{
    "include": {
        "relation": "samples",
        "scope": {
            "where": {
                "description": "Vanadium in a container",
            }
        }
    }
}
```

## Examples

* Query datasets acquired using X-Ray Absorption:

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
          "pid": "20.500.12269/44093jwfrd09",
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
      },
      "files": [
        {
          "id": "20.500.12269/0434853",
          "name": "0434853.hdf"
        }
      ]
    }
  ]
  ```

* Query datasets where the photon energy range is 880-990 eV:

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
          "id": "20.500.12269/44093jwfrd09",
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
        "facility: "ESS"
      },
      "files": [
        {
          "id": "20.500.12269/004925485"
          "name": "004925485.hdf"
        }
      ]
    }
  ]
  ```

* Query datasets with a solid sample containing copper:

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
          "id": "20.500.12269/942700429",
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
      },
      "files": [
        {
          "id": "20.500.12269/6843950",
          "name": "6843950.hdf"
        }
      ]
    }
  ]
  ```

* Query datasets where temperature is below 80°C:

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
          "id": "20.500.12269/44093jwfrd09",
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
        "facility: "ESS"
      },
      "files": [
        {
          "id": "20.500.12269/004925485"
          "name": "004925485.hdf"
        }
      ]
    }
  ]
  ```
