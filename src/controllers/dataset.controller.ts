import {
  param,
  get,
  getModelSchemaRef,
  getFilterSchemaFor,
} from '@loopback/rest';
import {Dataset} from '../models';
import {intercept, Interceptor} from '@loopback/core';
import {inject} from '@loopback/context';
import { convertQuery } from '../utils';
import { Condition }  from '@loopback/repository'

import {Scicat} from '../services';
import {UnitsInterceptor} from '../interceptors';
import {Filter} from '@loopback/repository';

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

interface LooseObject {
  [key: string]: any;
}

export class DatasetController {
  constructor(
    @inject('services.Scicat')
    protected scicatService: Scicat,
  ) {}

  @intercept(log)
  @get('/datasets/query/{text}', {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getDetails(
    @param.path.string('text') text: string,
    @param.query.object('filter', getFilterSchemaFor(Dataset))
    filter?: Filter<Dataset>,
  ): Promise<Dataset[]> {
    console.log('query of = ', text);
    console.log('query of = ', filter);
    console.log('query of = ', typeof filter);
    const scicatQuery = {
      limit: '1',
      skip: '0',
      where: {
        and: [
          {
            publicationYear: {gt: 2018},
          },
          {sizeOfArchive: {gt: 0}},
        ],
      },
    };
    // const fieldsQuery: LooseObject = {};
    if (typeof filter !== undefined) {
      console.log('keys ', filter!.fields);
      console.log('limit ', filter!.limit);
      const limit = filter!.limit;
      if (limit !== undefined && typeof limit !== undefined) {
        console.log('limit', limit);
        scicatQuery['limit'] = limit!.toString();
      }
      const skip = filter!.skip;
      if (skip !== undefined && typeof skip !== undefined) {
        scicatQuery['skip'] = skip!.toString();
      }
      const where = filter!.where;
      if (where !== undefined && typeof where !== undefined) {
        console.log('where', where);
        // loop through conditions in where
        const newWhere = convertQuery(where);
        console.log(newWhere);

        //fieldsQuery['fields'] = where!.toString();
      }
    }

    const jsonLimits = encodeURIComponent(JSON.stringify(scicatQuery));
    //    const jsonFields =
    //      'fields=' + encodeURIComponent(JSON.stringify(fieldsQuery));
    const fullQuery = jsonLimits;
    console.log(fullQuery);

    return this.callScicat(fullQuery);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callScicat(text: string): Promise<any> {
    return this.scicatService.getDetails(text);
  }
}
