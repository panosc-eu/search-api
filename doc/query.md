# Query Syntax

The query syntax is based on Loopback Where filter (https://loopback.io/doc/en/lb3/Where-filter.html), but with the addition of units

## Inequality operators

A query consists of a JSON object with four properties:

```js
{
    where: {
        variable: 'sample_temperature',
        operator: 'gt',
        value: 300,
        unit: 'kelvin'
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

```js
{limit:0}
```

to the filter.
Results can be skipped using the `skip` property

```js
{skip:0}
```

## Including related models

Related models may be included by using the ```include``` syntax

```js
{
    include: {
        relation: 'samples',
        scope: {
            where: {
                description: 'xx',
            }
        }
    }
}
```

## Examples

* Query datasets acquired using X-Ray Absorption:

```js
{
    where: {
        'techniques.name': 'X-Ray Absorption'
    }
}
```

* Query datasets where the photon energy range is 880-990 eV:

```js
{
    where: {
        and: [
            {
                variable: 'photon_energy',
                operator: 'gt',
                value: 880,
                unit: 'eV'
            },
            {
                variable: 'photon_energy',
                operator: 'lt',
                value: 990,
                unit: 'eV'
            }
        ]
    }
}
```

* Query datasets with a solid sample containing copper:

```js
{
    where: {
        and: [
            {
                variable: 'sample_state',
                operator: 'eq',
                value: 'solid'
            },
            {
                variable: 'chemical_formula',
                operator: 'eq',
                value: 'Cu'
            }
        ]
    }
}
```

* Query datasets where temperature is below 80°C:

```js
{
    where: {
        query: {
            variable: 'temperature',
            operator: 'lt',
            value: 80,
            unit: 'celsius'
        }
    }
}
```
