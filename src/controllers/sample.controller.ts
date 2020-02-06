import {Filter} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
} from '@loopback/rest';
import {Sample} from '../models';
import {
  idquery,
  convertQueryForSciCat,
  convertSampleToPaN,
  PanSample,
  SciCatSample,
} from '../utils';
import {PanService} from '../services';
import {inject} from '@loopback/context';

export class SampleController {
  constructor(
    @inject('services.PanService')
    protected panService: PanService,
  ) {}

  @get('/samples', {
    responses: {
      '200': {
        description: 'Array of Sample model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sample)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Sample))
    filter?: Filter<Sample>,
  ): Promise<Sample[]> {
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let fullQuery = '';
    if (config === 'scicat') {
      fullQuery = convertQueryForSciCat(filter);
    } else if (config === 'local') {
      // search locally
    }

    return this.callPanService(fullQuery);
  }

  @get('/samples/{id}', {
    responses: {
      '200': {
        description: 'Sample model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sample)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Sample> {
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let fullQuery = '';
    if (config === 'scicat') {
      fullQuery = idquery(id);
    } else if (config === 'local') {
      // search locally
    }

    return this.callPanService(fullQuery);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callPanService(text: string): Promise<any> {
    return this.panService.getSamples(text).then(res => {
      // console.log('====== \n result:', res);
      const array: PanSample[] = [];
      res.forEach((element: SciCatSample) => {
        array.push(convertSampleToPaN(element));
      });
      return array;
    });
  }
}
