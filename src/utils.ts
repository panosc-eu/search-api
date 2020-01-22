import Qty = require('js-quantities');
import { Dataset } from './models';
import { Condition, Where } from '@loopback/repository';

export interface Query {
  variable: string;
  operator: string;
  value: number;
  unit: string;
}

export interface Operator {
  [x: string]: number;
}

export interface LoopBackQuery {
  [variable: string]: Operator;
}

export function convertQuery(andQuery: Query[]) {
  const newQuery: LoopBackQuery[] = [];
  andQuery.forEach(element => {
    newQuery.push(processQuery(element));
  });
  console.log(newQuery);
  return newQuery;
}

export function processQuery(whereQuery: Condition<Dataset>) {
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


export function convertUnits(value: number, unit: string) {
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
  const floatConverted = parseFloat(convertedValue);
  return floatConverted;
}
