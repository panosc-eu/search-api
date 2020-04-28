import {
  param,
  get,
  getModelSchemaRef,
  getFilterSchemaFor,
} from '@loopback/rest';
import {Dataset, File} from '../models';
import {Filter} from '@loopback/repository';
import {PanService} from '../services/pan.service';
import {
  convertDatasetToPaN,
  convertQueryForSciCat,
  getPaNFilesFromDataset,
} from '../utils';
import {PanDataset} from '../pan-interfaces';
import {SciCatDataset} from '../scicat-interfaces';
import {inject} from '@loopback/context';

export class DatasetController {
  constructor(
    @inject('services.PanService')
    protected panService: PanService,
  ) {}

  @get('/datasets/{pid}', {
    responses: {
      '200': {
        description: 'Dataset model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dataset)}},
      },
    },
  })
  async findById(@param.path.string('pid') pid: string): Promise<Dataset> {
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let pidQuery = '';
    if (config === 'scicat') {
      pidQuery = pid;
    } else if (config === 'local') {
      // search locally
    }

    return this.getDetailsById(pidQuery);
  }

  @get('/datasets/{pid}/files', {
    responses: {
      '200': {
        description: 'File model instances for dataset',
        content: {'application/json': {schema: getModelSchemaRef(File)}},
      },
    },
  })
  async findByIdFiles(@param.path.string('pid') pid: string): Promise<File[]> {
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let pidQuery = '';
    if (config === 'scicat') {
      pidQuery = pid;
    } else if (config === 'local') {
      // search locally
    }

    return this.getByIdFiles(pidQuery);
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
  ): Promise<Dataset[]> {
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let fullQuery = '';
    if (config === 'scicat') {
      fullQuery = convertQueryForSciCat(filter);
    } else if (config === 'local') {
      // search locally
    }

    return this.callPanService(fullQuery);
  }

  async getDetailsById(pid: string): Promise<Dataset> {
    return this.panService
      .getDetails(JSON.stringify({where: {pid}}))
      .then(res =>
        res
          .map((element: SciCatDataset) => convertDatasetToPaN(element))
          .find((element: Dataset) => element.pid === pid),
      );
  }

  async getByIdFiles(pid: string): Promise<File[]> {
    return this.panService
      .getDetails(JSON.stringify({where: {pid}, include: 'origdatablocks'}))
      .then(res => {
        const dataset = res.find(
          (element: SciCatDataset) => element.pid === pid,
        );

        return getPaNFilesFromDataset(dataset);
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callPanService(text: string): Promise<any> {
    return this.panService.getDetails(text).then(res => {
      // console.log('====== \n result:', res);
      const array: PanDataset[] = [];
      res.forEach((element: SciCatDataset) => {
        array.push(convertDatasetToPaN(element));
      });
      return array;
    });
  }
}
