import Qty = require('js-quantities');

interface Query {
  variable: string;
  operator: string;
  value: number;
  unit: string;
}

interface Operator {
  [x: string]: number;
}

interface LoopBackQuery {
  [variable: string]: Operator;
}

export function convertQuery(andQuery: Array<Query>) {
  const newQuery: LoopBackQuery[] = [];
  andQuery.forEach(element => {
    newQuery.push(processQuery(element));
  });
  console.log(newQuery);
  return newQuery;
}

export function processQuery(whereQuery: Query) {
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
