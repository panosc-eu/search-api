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
      console.log('Going to convert units for %s', ctx.Model.modelName);
      console.log('units');
      console.log('ctx', ctx.query);
      if (Object.prototype.hasOwnProperty.call(ctx, 'query')) {
        if (Object.prototype.hasOwnProperty.call(ctx.query, 'where')) {
          const whereFilter = ctx.query.where;
          // console.log('where', whereFilter);
          if (Object.prototype.hasOwnProperty.call(whereFilter, 'and')) {
            // console.log('where filter ', whereFilter['and']);
            const andQuery = whereFilter['and'] as Array<Object>;
            let unit = 'm';
            let val = '0';
            andQuery.forEach(element => {
              console.log('ele', element);
              Object.entries(element).forEach(entry => {
                const key = entry[0];
                const value = entry[1];
                if (key.endsWith('.unit')) {
                  console.log('key', key);
                  unit = value;
                }
                if (key.endsWith('.value')) {
                  console.log(key);
                  val = value;
                  val = extractValueFromOperator(value);
                }
              });
            });
            const qtyString = String(val) + ' ' + unit;
            console.log(qtyString);
            const qty = new Qty(qtyString);
            console.log(new Date(Date.now()));
            console.log(qty.toString());
            console.log(qty.toBase().toString());
          }
        }
      }
    });
  }
}

function extractValueFromOperator(operator: Object) {
  let value = '50';
  console.log('operator', operator);
  Object.entries(operator).forEach(entry => {
    value = String(entry[1]);
    // console.log(value2);
  });
  return value;
}
