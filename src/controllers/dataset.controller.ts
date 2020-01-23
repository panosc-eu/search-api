import {
  param,
  get,
  getModelSchemaRef,
  getFilterSchemaFor,
} from '@loopback/rest';
import {Dataset} from '../models';
import {Filter} from '@loopback/repository';
import {PanService} from '../services/pan.service';
import {convertQueryForSciCat} from '../utils';
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
    @inject('services.Pan')
    protected panService: PanService,
  ) {}

  @intercept(log)
  @get('/datasets/query', {
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
  ): Promise<Dataset[]> {
    const config = 'scicat';
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
    return this.panService.getDetails(text);
  }
}
