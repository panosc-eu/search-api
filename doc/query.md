


# Query Syntax

The query syntax is based on Loopback Where filter (https://loopback.io/doc/en/lb3/Where-filter.html), but with the addition of units

## Inequality operators

A query consists of a JSON object with four properties:
```
{where:{ 
variable: "sample_temperature",
operator: "gt",
value: 300,
unit: "K"
}}
```
Properties:

variable - name of the variable to be filtered

operator - standard [in]equalities, gt, ge, lt, le, eq

value - numerical value for the inequality 

unit - string, should be a standard unit as currently defined in js-quantities

https://github.com/gentooboontoo/js-quantities



## Joining Queries 
A query can use logical and and or to join queries together.


