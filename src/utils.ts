import Qty = require('js-quantities');

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

export function convertNameforScicat(panoscName: string) {
  return 'scientificMetadata.' + panoscName + '.value';
}
