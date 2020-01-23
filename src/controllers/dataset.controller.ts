import {
  param,
  get,
  getModelSchemaRef,
  getFilterSchemaFor,
} from '@loopback/rest';
import {Dataset} from '../models';
import {Filter, Where} from '@loopback/repository';
import {PanService} from '../services/pan.service';
import {
  convertUnits,
  Query,
  LoopBackQuery,
  convertNameforScicat,
} from '../utils';
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
            const convertedValue = convertUnits(query1.value, query1.unit);
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
            const convertedValue = convertUnits(query1.value, query1.unit);
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
          const convertedValue = convertUnits(query2.value, query2.unit);
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
    const fullQuery = jsonLimits;

    return this.callPanService(fullQuery);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callPanService(text: string): Promise<any> {
    return this.panService.getDetails(text);
  }
}
