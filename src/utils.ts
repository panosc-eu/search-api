import Qty = require('js-quantities');
import {Filter, Where} from '@loopback/repository';
import {Dataset} from './models';

export interface Query {
  variable: string;
  operator: string;
  value: number;
  unit: string;
}

export interface Loopback3Query {
  include?: Object;
  limit?: number;
  offset?: number;
  skip?: number;
  where?: Object;
}

export interface Operator {
  [x: string]: number;
}

export interface LoopBackQuery {
  [variable: string]: Operator;
}

export interface Measurement {
  unit?: string;
  value: number;
  name: string;
}

export interface SciCatMeasurement {
  unit: string;
  value: number;
  type: string;
}
export interface SciCatMeta {
  [name: string]: SciCatMeasurement;
}
export interface SciCatDataset {
  scientificMetadata: SciCatMeta;
  samples: SciCatSample[];
  doi: string;
  pid: string;
  size: number;
  datasetName: string;
  creationTime: string;
}

export interface SciCatSample {
  scientificMetadata: SciCatMeta;
  sampleId: string;
  size: number;
  description: string;
  creationTime: string;
}

export interface SciCatPublishedData {
  doi: string;
  title: string;
  abstract: string;
}

export interface PanDataset {
  pid: string;
  isPublic: boolean;
  title: string;
  creationDate: string;
  size: number;
  parameters?: Measurement[];
  samples?: PanSample[];
}

export interface PanDocument {
  pid: string;
  type: string;
  summary: string;
  title: string;
  startDate: string;
  endDate: string;
  releaseDate: string;
  license: string;
}
export interface PanSample {
  pid: string;
  title: string;
  parameters?: Measurement[];
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
    const planckConstant = 6.62607015e-34;
    const speedOfLight = 2.99792458e8;
    const lambda = (planckConstant * speedOfLight) / floatConverted;
    return lambda;
  }
  return floatConverted;
}

export function convertNameforScicat(panoscName: string) {
  return 'scientificMetadata.' + panoscName + '.value';
}

export function convertQueryForSciCat(filter?: Filter<Dataset>) {
  const scicatQuery: Loopback3Query = {};
  if (filter !== undefined && typeof filter !== undefined) {
    if ('include' in filter!) {
      const include = filter!['include'];
      if (include !== undefined && typeof include !== undefined) {
        scicatQuery['include'] = filter['include'];
      }
    }
    if ('limit' in filter!) {
      const limit = filter!['limit'];
      if (limit !== undefined && typeof limit !== undefined) {
        scicatQuery['limit'] = limit;
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
          const convertedName = convertNameforScicat(query1.variable);

          const andElement: Where = {
            [convertedName]: {
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
        const convertedName = convertNameforScicat(query2.variable);
        const condition: Where = {
          [convertedName]: {
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

export function idquery(pid: string) {
  const scicatQuery = {id: pid};
  const jsonString = JSON.stringify(scicatQuery);
  console.log(jsonString);
  const jsonLimits = encodeURIComponent(jsonString);
  return jsonLimits;
}

export function convertToPaN(scicatDataset: SciCatDataset) {
  const panDataset: PanDataset = {
    pid: scicatDataset.pid,
    isPublic: true,
    title: scicatDataset.datasetName,
    creationDate: scicatDataset.creationTime,
    size: scicatDataset.size,
  };
  const paramArray: Measurement[] = [];
  if ('scientificMetadata' in scicatDataset) {
    Object.keys(scicatDataset.scientificMetadata).forEach((key: string) => {
      // console.log('key', key);
      const panParam = {
        name: key,
        value: scicatDataset.scientificMetadata[key]['value'],
        unit: scicatDataset.scientificMetadata[key]['unit'],
      };
      paramArray.push(panParam);
    });
    panDataset.parameters = paramArray;
  }
  const sampleArray: PanSample[] = [];
  if ('samples' in scicatDataset) {
    scicatDataset.samples.forEach((value: SciCatSample) => {
      console.log('sample', value);
      const panSample = {
        pid: value.sampleId,
        title: value.description,
      };
      sampleArray.push(panSample);
    });
  }
  panDataset.samples = sampleArray;
  return panDataset;
}

export function convertSampleToPaN(scicatSample: SciCatSample) {
  const panSample: PanSample = {
    pid: scicatSample.sampleId,
    title: scicatSample.description,
  };
  const paramArray: Measurement[] = [];
  if ('scientificMetadata' in scicatSample) {
    Object.keys(scicatSample.scientificMetadata).forEach((key: string) => {
      // console.log('key', key);
      const panParam = {
        name: key,
        value: scicatSample.scientificMetadata[key]['value'],
        unit: scicatSample.scientificMetadata[key]['unit'],
      };
      paramArray.push(panParam);
    });
    panSample.parameters = paramArray;
  }
  return panSample;
}

export function convertDocumentToPaN(scicatPub: SciCatPublishedData) {
  const panDataset: PanDocument = {
    pid: scicatPub.doi,
    title: scicatPub.title,
    summary: 'String',
    type: 'String',
    startDate: '2020-02-02',
    endDate: '2020-02-02',
    releaseDate: '2020-02-02',
    license: 'CC-BY-4.0',
  };
  return panDataset;
}
