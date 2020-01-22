import {
  param,
  get,
  getModelSchemaRef,
  getFilterSchemaFor,
} from '@loopback/rest';
import {Dataset} from '../models';
import {intercept, Interceptor} from '@loopback/core';
import {inject} from '@loopback/context';
import {convertQuery, Query, LoopBackQuery} from '../utils';
import {Condition, Where, AndClause} from '@loopback/repository';

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
    const scicatQuery: Filter = {};
    // const fieldsQuery: LooseObject = {};
    if (typeof filter !== undefined) {
      console.log('keys ', filter!.fields);
      console.log('limit ', filter!.limit);
      const limit = filter!.limit;
      if (limit !== undefined && typeof limit !== undefined) {
        console.log('limit', limit);
        scicatQuery['limit'] = limit;
      } else {
        scicatQuery['limit'] = 1;
      }
      const skip = filter!.skip;
      if (skip !== undefined && typeof skip !== undefined) {
        scicatQuery['skip'] = skip;
      } else {
        scicatQuery['skip'] = 0;
      }
      const where = filter!.where;
      if (where !== undefined && typeof where !== undefined) {
        console.log('where', where);
        if ('and' in where) {
          console.log('and clause');
          const emptyArray: LoopBackQuery[] = [];
          where.and.forEach( (element:Object) => {
            console.log(element);
            const query1 = element as Query;
            console.log(query1.variable);
            const andElement: Where = {
              [query1.variable]: {
                [query1.operator]: query1.value
              },
            };
            emptyArray.push(andElement);
          });
          scicatQuery['where'] = { and : emptyArray};
          //{ publicationYear: { gt: 2018 } };
        } else if ('or' in where) {
          console.log('or clause');
        } else {
          console.log('condition');
        }
        // loop through conditions in where
        //const newWhere = convertQuery(where);
        //console.log(newWhere);

        //fieldsQuery['fields'] = where!.toString();
      }
    }
    const jsonString =JSON.stringify(scicatQuery);
    console.log(jsonString);
    const jsonLimits = encodeURIComponent(jsonString);
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
