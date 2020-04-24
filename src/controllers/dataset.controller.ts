import {
  param,
  get,
  getModelSchemaRef,
  getFilterSchemaFor,
} from '@loopback/rest';
import {Dataset} from '../models';
import {Filter} from '@loopback/repository';
import {PanService} from '../services/pan.service';
import {convertDatasetToPaN, convertQueryForSciCat} from '../utils';
import {SciCatDataset} from '../scicat-interfaces';
import {inject} from '@loopback/context';

export class DatasetController {
  constructor(
    @inject('services.PanService')
    protected panService: PanService,
  ) {}

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

    return this.getDetails(fullQuery);
  }

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
    let idQuery = '';
    if (config === 'scicat') {
      idQuery = encodeURIComponent(id);
    } else if (config === 'local') {
      // search locally
    }

    return this.getDetailsById(idQuery);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getDetails(text: string): Promise<any> {
    return this.panService.getDetails(text).then(res => {
      // console.log('====== \n result:', res);
      return res.map((element: SciCatDataset) => convertDatasetToPaN(element));
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getDetailsById(id: string): Promise<any> {
    return this.panService
      .getDetailsById(id)
      .then((res: SciCatDataset) => convertDatasetToPaN(res));
  }
}
