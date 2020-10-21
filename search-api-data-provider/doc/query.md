# Querying

The query syntax is based on the [Loopback query filter](https://loopback.io/doc/en/lb3/Querying-data.html).

## General remarks

- All queries must be submitted as a JSON object.

- When supplying units in a parameter query, the quantity will be converted to SI units for comparison with the value stored in the database. Before returning the results, the relevant quantity is converted to the unit supplied by the user in the query. E.g., if querying a parameter in *keV*, the quantity will be converted to *kg m<sup>2</sup> / s<sup>2</sup>* and compared to the SI value stored in the database. Before returning the results with the relevant quantities to the user, they will be converted to the same unit that the user provided in the query, in this case *keV*.

---

## Contents

1. [Syntax](#syntax)
   1. [Where filter](#where-filter)
      1. [General usage](#general-usage)
      2. [Operators](#operators)
         - [Text operator](#text-operator)
         - [Joining queries](#joining-queries)
   2. [Include filter](#include-filter)
      1. [General usage](#general-usage-1)
      2. [Include with match conditions](#include-with-match-conditions)
   3. [Limit filter](#limit-filter)
   4. [Skip filter](#skip-filter)
2. [Examples](#examples)

---

## Syntax

The query syntax is written in JSON format:
```json
{
    "where": {
        "property": "value"
    },
    "include": [
        {
            "relation": "relatedModel",
            "scope": {
                "where": {
                    "property": "value"
                }
            }
        }
    ],
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
- `operator` - one of the operators specified in the [Loopback operators documentation](https://loopback.io/doc/en/lb3/Where-filter.html#operators) (e.g. "lt", "gt", "between") or ["text"](#text-operator)

#### Text operator

The text operator can be used to query data matching a string.

```json
{"where": {"text": "value"}}
```

The value will then be matched with the following fields (see [Example](./dataset-example-queries.md#query-datasets-with-files-matching-a-string-using-full-text-search)):

| Model      | Fields            |
| ---------- | ----------------- |
| Dataset    | Title             |
| Document   | Title, Summary    |
| File       | Name              |
| Instrument | Name, Facility    |
| Sample     | Name, Description |
| Technique  | Name              |

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

---

### Include filter

Related models may be included by using the `include` filter.

#### General usage

To include a related model, the query should be formatted in the following way:

```json
{"include": [{"relation": "relatedModel"}]}
```

If you want to include additional related models, simply append them to the array, e.g.:

```json
{"include": [{"relation": "relatedModel1"}, {"relation": "relatedModel2"}]}
```

#### Include with match conditions

To include a related model with match conditions, use the `scope` property:

```json
{
    "include": [
        {
            "relation": "relatedModel",
            "scope": {
                "where": {
                    "property": "value"
                }
            }
        }
    ]
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
- [Instrument Queries](./instrument-example-queries.md)
