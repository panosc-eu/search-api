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
          if (Object.prototype.hasOwnProperty.call(whereFilter, 'and')) {
            const andQuery = whereFilter['and'] as Array<Query>;
            const convertedQuery = convertQuery(andQuery);
            ctx.query.where = convertedQuery;
          } else {
            console.log();
            ctx.query.where = processQuery(ctx.query.where);
            console.log(ctx.query.where);
          }
        }
      }
    });
  }
}

function convertUnits(value: number, unit: string) {
  const qtyString = String(value) + ' ' + unit;
  const qty = new Qty(qtyString);
  const convertedQuantity = qty.toBase().toString();

  /*
  const convertedUnit = convertedQuantity.substr(
    convertedQuantity.indexOf(' ') + 1,
  );
  */
  const convertedValue = convertedQuantity.substr(
    0,
    convertedQuantity.indexOf(' '),
  );
  return parseFloat(convertedValue);
}

interface Query {
  variable: string;
  operator: string;
  value: number;
  unit: string;
}

function processQuery(whereQuery: Query) {
  let variable = 'pressure';
  let operator = 'lt';
  let value = 0;
  let unit = 'furlongs/fortnight';

  variable = whereQuery.variable + '.value';
  operator = whereQuery.operator;
  unit = whereQuery.unit;

  value = convertUnits(whereQuery.value, unit);

  const query = {
    [variable]: {[operator]: value},
  };
  console.log(query);
  return query;
}

interface Operator {
  [x :string]: number;
}
interface LoopBackQuery {
  [variable: string] : Operator;
}

function convertQuery(andQuery: Array<Query>) {
  const newQuery: LoopBackQuery[] = [];
  andQuery.forEach(element => {
    newQuery.push(processQuery(element));
  });
  console.log(newQuery);
  return newQuery;
}
