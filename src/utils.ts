import Qty = require('js-quantities');
import {Filter, Where} from '@loopback/repository';
import {Dataset} from './models';

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

export function convertUnits(name: string, value: number, unit: string) {
  const qtyString = String(value) + ' ' + unit;
  const qty = new Qty(qtyString);
  const convertedQuantity = qty.toBase().toString();

  const convertedUnit = convertedQuantity.substr(
    convertedQuantity.indexOf(' ') + 1,
  );
  const convertedValue = convertedQuantity.substr(
    0,
    convertedQuantity.indexOf(' '),
  );
  const floatConverted = parseFloat(convertedValue);
  // add logic for wavlength in units of energy
  if (name === 'wavelength' && convertedUnit === 'J') {
    // if units are in energy
    // convert to joules than length
    const planckConstant = 6.64e-34;
    const speedOfLight = 3e8;
    const lambda = (planckConstant * speedOfLight) / floatConverted;
    return lambda;
  }
  return floatConverted;
}

export function convertNameforScicat(panoscName: string) {
  return 'scientificMetadata.' + panoscName + '.value';
}

export function convertQueryForSciCat(filter?: Filter<Dataset>) {
  const scicatQuery: Filter = {};
  if (filter !== undefined && typeof filter !== undefined) {
    if ('limit' in filter!) {
      const limit = filter!['limit'];
      if (limit !== undefined && typeof limit !== undefined) {
        scicatQuery['limit'] = limit;
      } else {
        scicatQuery['limit'] = 1;
      }
    }
    if ('skip' in filter!) {
      const skip = filter!['skip'];
      if (skip !== undefined && typeof skip !== undefined) {
        scicatQuery['skip'] = skip;
      } else {
        scicatQuery['skip'] = 0;
      }
    }
    const where = filter!.where;
    if (where !== undefined && typeof where !== undefined) {
      if ('and' in where) {
        const parameterSearchArray: LoopBackQuery[] = [];
        where.and.forEach((element: Object) => {
          const query1 = element as Query;
          console.log(query1);
          const convertedValue = convertUnits(
            query1.variable,
            query1.value,
            query1.unit,
          );
          const convertedName = convertNameforScicat(query1.variable);
          const andElement: Where = {
            [convertedName]: {
              [query1.operator]: convertedValue,
            },
          };
          parameterSearchArray.push(andElement);
        });
        scicatQuery['where'] = {and: parameterSearchArray};
      } else if ('or' in where) {
        const parameterSearchArray: LoopBackQuery[] = [];
        where.or.forEach((element: Object) => {
          const query1 = element as Query;
          console.log(query1);
          const convertedValue = convertUnits(
            query1.variable,
            query1.value,
            query1.unit,
          );
          const andElement: Where = {
            [query1.variable]: {
              [query1.operator]: convertedValue,
            },
          };
          parameterSearchArray.push(andElement);
        });
        scicatQuery['where'] = {or: parameterSearchArray};
      } else if ('query' in where) {
        const query2 = where!.query as Query;
        const convertedValue = convertUnits(
          query2.variable,
          query2.value,
          query2.unit,
        );
        const condition: Where = {
          [query2.variable]: {
            [query2.operator]: convertedValue,
          },
        };
        scicatQuery['where'] = condition;
      } else {
        // breakout
      }
    }
  }
  const jsonString = JSON.stringify(scicatQuery);
  console.log(jsonString);
  const jsonLimits = encodeURIComponent(jsonString);
  return jsonLimits;
}
