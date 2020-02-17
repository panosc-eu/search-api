import {
  param,
  get,
  getModelSchemaRef,
  getFilterSchemaFor,
} from '@loopback/rest';
import {Dataset} from '../models';
import {Filter} from '@loopback/repository';
import {PanService} from '../services/pan.service';
import {
  PanDataset,
  SciCatDataset,
  convertToPaN,
  convertQueryForSciCat,
  idquery,
} from '../utils';
import {inject} from '@loopback/context';

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
      const array: PanDataset[] = [];
      res.forEach((element: SciCatDataset) => {
        array.push(convertToPaN(element));
      });
      return array;
    });
  }
}
