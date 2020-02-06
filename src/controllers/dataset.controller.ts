import {
  param,
  get,
  getModelSchemaRef,
  getFilterSchemaFor,
} from '@loopback/rest';
import {Dataset} from '../models';
import {Filter} from '@loopback/repository';
import {PanService} from '../services/pan.service';
import {convertQueryForSciCat, idquery} from '../utils';
import {inject} from '@loopback/context';
import {intercept, Interceptor} from '@loopback/core';

const log: Interceptor = async (invocationCtx, next) => {
  console.log('log: before-' + invocationCtx.methodName);
  // Wait until the interceptor/method chain returns
  if (invocationCtx.args) {
    console.log('args:', invocationCtx.args);
    console.log('ctx', invocationCtx);
  }
  const result = await next();
  console.log('log: after-' + invocationCtx.methodName);
  return result;
};
/*
interface LooseObject {
  [key: string]: any;
}
*/

export class DatasetController {
  constructor(
    @inject('services.PanService')
    protected panService: PanService,
  ) {}

  @get('/datasets/{id}', {
    responses: {
      '200': {
        description: 'Dataset model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dataset)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Dataset> {
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let fullQuery = '';
    if (config === 'scicat') {
      fullQuery = idquery(id);
    } else if (config === 'local') {
      // search locally
    }

    return this.callPanService(fullQuery);
  }

  @get('/datasets/{id}/metadata', {
    responses: {
      '200': {
        description: 'Dataset metadata info instance',
        content: {'application/xml': {}},
      },
    },
  })
  async metadata(@param.path.string('id') id: string): Promise<String> {
    const jsonObject = {};
    const xml = jsonToXML(jsonObject);
    return xml;
  }

  @intercept(log)
  @get('/datasets/', {
    responses: {
      '200': {
        description: 'Array of Dataset model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Dataset)},
          },
        },
      },
    },
  })
  async getDatasets(
    @param.query.object('filter', getFilterSchemaFor(Dataset))
    filter?: Filter<Dataset>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let fullQuery = '';
    if (config === 'scicat') {
      fullQuery = convertQueryForSciCat(filter);
    } else if (config === 'local') {
      // search locally
    }

    return this.callPanService(fullQuery);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callPanService(text: string): Promise<any> {
    return this.panService.getDetails(text).then(res => {
      // console.log('====== \n result:', res);
      const array: PanObject[] = [];
      res.forEach((element: SciCatObject) => {
        array.push(convertToPaN(element));
      });
      return array;
    });
  }
}

interface Measurement {
  unit?: string;
  value: number;
  name: string;
}

interface SciCatMeasurement {
  unit: string;
  value: number;
  type: string;
}

interface SciCatMeta {
  [name: string]: SciCatMeasurement;
}
interface SciCatObject {
  scientificMetadata: SciCatMeta;
  doi: string;
  pid: string;
  title: string;
  creationTime: string;
}

interface PanObject {
  pid: string;
  isPublic: boolean;
  title: string;
  creationDate: string;
  size: number;
  parameters?: Measurement[];
}

function convertToPaN(scicatDataset: SciCatObject) {
  const panDataset: PanObject = {
    pid: scicatDataset.pid,
    isPublic: true,
    title: scicatDataset.title,
    creationDate: scicatDataset.creationTime,
    size: 2,
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
  return panDataset;
}

function jsonToXML(jsonInput: Object) {
  const xml = `
  <?xml version="1.0" encoding="ISO-8859-1" ?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"></xs:schema>
  `;
  return xml;
}
