import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Dataset} from '../models';
import {intercept, Interceptor} from '@loopback/core';
import {inject} from '@loopback/context';

import {Scicat} from '../services';
import {UnitsInterceptor} from '../interceptors';

const log: Interceptor = async (invocationCtx, next) => {
  console.log('log: before-' + invocationCtx.methodName);
  // Wait until the interceptor/method chain returns
  if (invocationCtx.args) {
    console.log('args:', invocationCtx.args);
    console.log('ctx',invocationCtx);
  }
  const result = await next();
  console.log('log: after-' + invocationCtx.methodName);
  return result;
};

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
  async getDetails(@param.path.string('text') text: string ): Promise<any> {
    console.log('query of = ', text);

    const scicatQuery = {limit: '1', skip: '0'};
    const fieldsQuery = {text: 'string'};
    scicatQuery['limit'] = '1';
    scicatQuery['skip'] = '0';
    fieldsQuery['text'] = 'v20';

    const jsonLimits ='limits='+ encodeURIComponent(
       JSON.stringify(scicatQuery),
    );
    const jsonFields = 'fields='+encodeURIComponent(
      JSON.stringify(fieldsQuery),
    );
    const fullQuery = jsonFields + '&' + jsonLimits;
    console.log(fullQuery);

    return this.callScicat(fullQuery);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callScicat(text: string): Promise<any> {
    return this.scicatService.getDetails(text);
  }
}
