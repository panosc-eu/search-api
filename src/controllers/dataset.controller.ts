import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Dataset} from '../models';
import {inject} from '@loopback/context';

import {Scicat} from '../services';

export class DatasetController {
  constructor(
    @inject('services.Scicat')
    protected scicatService: Scicat,
  ) {}

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
  async getDetails(@param.path.string('text') text: string): Promise<any> {
    console.log('query of = ', text);
    return this.callScicat(text);
  }

  async callScicat(text: string): Promise<any> {
    return this.scicatService.getDetails(text);
  }
}
