/* eslint @typescript-eslint/no-explicit-any: 0 */
import {DefaultCrudRepository} from '@loopback/repository';
import {Dataset, DatasetRelations} from '../models';
import {inject} from '@loopback/core';
import {juggler} from '@loopback/service-proxy';
import Qty = require('js-quantities');

export class DatasetRepository extends DefaultCrudRepository<
  Dataset,
  typeof Dataset.prototype.pid,
  DatasetRelations
> {
  constructor(@inject('datasources.db') dataSource: juggler.DataSource) {
    super(Dataset, dataSource);

    (this.modelClass as any).observe('access', async (ctx: any) => {
      if (Object.prototype.hasOwnProperty.call(ctx, 'query')) {
        if (Object.prototype.hasOwnProperty.call(ctx.query, 'where')) {
          const whereFilter = ctx.query.where;
          // console.log('where', whereFilter);
          if (Object.prototype.hasOwnProperty.call(whereFilter, 'and')) {
            // console.log('where filter ', whereFilter['and']);
            const andQuery = whereFilter['and'] as Array<Object>;
            const convertedQuery = convertQuery(andQuery);
            ctx.query.where = convertedQuery;
          }
        }
      }
    });
  }
}

function extractOperatorFromOperator(operator: Object) {
  let value = 'defaultValue';
  Object.entries(operator).forEach(entry => {
    value = entry[0];
  });
  return value;
}

function extractValueFromOperator(operator: Object) {
  let value = 'defaultValue';
  Object.entries(operator).forEach(entry => {
    value = String(entry[1]);
  });
  return value;
}

function convertQuery(andQuery: Array<Object>) {
  let unit = 'undefined_unit';
  let val = '999999';
  let operator = 'some_operator';
  let unitname = "some_measurement.unit";
  let valuename = "some_measurement.value";
  andQuery.forEach(element => {
    // console.log(element);

    Object.entries(element).forEach(entry => {
      const key = entry[0];
      const value = entry[1];
      if (key.endsWith('.unit')) {
        unitname = key;
        unit = value;
      }
      if (key.endsWith('.value')) {
        valuename = key;
        val = value;
        val = extractValueFromOperator(value);
        operator = extractOperatorFromOperator(value);
      }
    });
  });
  const qtyString = String(val) + ' ' + unit;
  const qty = new Qty(qtyString);

  const convertedQuantity = qty.toBase().toString();

  const convertedUnit = convertedQuantity.substr(
    convertedQuantity.indexOf(' ') + 1,
  );
  const convertedValue = convertedQuantity.substr(
    0,
    convertedQuantity.indexOf(' '),
  );
  const query = {
    and: [
      {
        [valuename]: {
          [operator] : convertedValue,
        },
      },
      {
        [unitname]: convertedUnit,
      },
    ],
  };
   console.log(JSON.stringify(query, null, 2));
  return query;
}
