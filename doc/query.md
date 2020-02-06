# Query Syntax

The query syntax is based on Loopback Where filter (https://loopback.io/doc/en/lb3/Where-filter.html), but with the addition of units

## Inequality operators

A query consists of a JSON object with four properties:

```js
{where:{
variable: "sample_temperature",
operator: "gt",
value: 300,
unit: "degK"
}}
```

Properties:

- `variable` - name of the variable to be filtered
- `operator` - inequalities, gt , lt, eq
- `value` - numerical value for the inequality
- `unit` - string, should be a standard unit as currently defined in js-quantities

https://github.com/gentooboontoo/js-quantities

## Joining Queries

A query can use logical and and or to join queries together.

## Paging

You can limit the number of queries by adding

```js
{limit:0}
```

to the filter.
Results can be skipped using the `skip` property

```js
{skip:0}
```
