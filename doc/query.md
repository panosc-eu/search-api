# Querying

The query syntax is based on [Loopback query filter](https://loopback.io/doc/en/lb3/Querying-data.html). All queries must be submitted as a JSON object.

## Contents

1. [Syntax](#syntax)
   1. [Where filter](#where-filter)
      1. [General usage](#general-usage)
      2. [Operators](#operators)
         - [Joining queries](#joining-queries)
      3. [Querying parameters](#querying-parameters)
   2. [Include filter](#include-filter)
      1. [General usage](#general-usage-1)
      2. [Include with match conditions](#include-with-match-conditions)
   3. [Limit filter](#limit-filter)
   4. [Skip filter](#skip-filter)
2. [Examples](#examples)

## Syntax

The query syntax is written in JSON format:
```json
{
    "where": {
        "property": "value"
    },
    "include": {
        "relation": "relatedModel",
        "scope": {
            "where": {
                "property": "value"
            }
        }
    },
    "limit": 0,
    "skip": 0
}
```
Documentation on the different filters can be found below.

---

### Where filter

The `where` filter is used to supply match conditions when querying data.

### General usage

To test equivalence, the filter should be written on the following form:
```json
{"where": {"property": "value"}}
```
- `property` - the name of the model property that is being queried
- `value` - the value that the property should be equal to

### Operators

The filter can also be used to match other conditions than equality, and should then be written on the form of:
```json
{"where": {"property": {"operator": "value"}}}
```
- `operator` - one of the operators specified in the [Loopback operators documentation](https://loopback.io/doc/en/lb3/Where-filter.html#operators)

#### Joining queries

A query can use logical `and` and `or` to join queries together. They are written on the following form:
```json
{
    "where": {
        "and": [
            {
                "property": "value"
            },
            {
                "property": "value"
            }
        ]
    }
}
```
```json
{
    "where": {
        "or": [
            {
                "property": "value"
            },
            {
                "property": "value"
            }
        ]
    }
}
```

#### Querying parameters

A parameter query consists of a JSON object with four properties. To query a single parameter should be of the following form:

```json
{
    "where": {
        "query": {
            "variable": "sample_temperature",
            "operator": "gt",
            "value": 300,
            "unit": "kelvin"
        } 
    }
}
```
Properties:

- `variable` - name of the variable to be filtered
- `operator` - `"gt"`, `"lt"`, `"eq"`
- `value` - numerical value for the inequality
- `unit` - string, should be a standard unit as currently defined in [Units and Prefixes](./units-and-prefixes.md)

Parameter queries also support `and` and `or` operators:
```json
{
    "where": {
        "and": [
            {
                "variable": "sample_temperature",
                "operator": "gt",
                "value": 300,
                "unit": "kelvin"
            },
            {
                "variable": "sample_temperature",
                "operator": "lt",
                "value": 350,
                "unit": "kelvin"
            }
        ]
    }
}
```

---

### Include filter

Related models may be included by using the `include` filter.

#### General usage

To include one related model, the query should be formatted in the following way:

```json
{"include": "relatedModel"}
```

The `include` filter also supports including more than one related model, using the following syntax:
```json
{"include": ["relatedModel1", "relatedModel2"]}
```

#### Include with match conditions

To include a related model with match conditions, use the `scope` property:

```json
{
    "include": {
        "relation": "relatedModel",
        "scope": {
            "where": {
                "property": "value"
            }
        }
    }
}
```

Similarly, to include more than one related model with match conditions:
```json
{
    "include": [
        {
            "relation": "relatedModel1",
            "scope": {
                "where": {
                    "property": "value"
                }
            }
        },
        {
            "relation": "relatedModel2",
            "scope": {
                "where": {
                    "property": "value"
                }
            }
        }
    ]
}
```

---

### Limit filter

You can limit the number of queries by adding

```json
{"limit": 0}
```
to the filter. It is not necessary to include this filter if the value is 0.

---

### Skip filter

Results can be skipped using the `skip` property

```json
{"skip": 0}
```
It is not necessary to include this filter if the value is 0.

---

## Examples

- [Dataset Queries](./dataset-example-queries.md)
- [Document Queries](./document-example-queries.md)
