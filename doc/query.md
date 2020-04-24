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
- `unit` - string, should be a standard unit as currently defined in [units-and-prefixes.md](https://github.com/panosc-eu/search-api/blob/master/doc/units-and-prefixes.md)

## Joining Queries

A query can use logical `and` and `or` to join queries together.

## Paging

You can limit the number of queries by adding

```json
{"limit": 0}
```

to the filter.
Results can be skipped using the `skip` property

```json
{"skip": 0}
```

## Including related models

Related models may be included by using the `include` syntax

```json
{
  "include": {
    "relation": "samples",
    "scope": {
      "where": {
        "description": "Vanadium in a container"
      }
    }
  }
}
```

## Examples

- [Datasets](./dataset-example-queries.md)
- [Documents](./document-example-queries.md)
