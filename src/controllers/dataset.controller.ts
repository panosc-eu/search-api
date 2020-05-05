import {
  param,
  get,
  getModelSchemaRef,
  getFilterSchemaFor,
} from '@loopback/rest';
import {Dataset, File} from '../models';
import {Filter, repository} from '@loopback/repository';
import {DatasetRepository} from '../repositories';
import {intercept} from '@loopback/core';
import {AddScoreInterceptor} from '../interceptors/add-score.interceptor';

export class DatasetController {
  constructor(
    @repository(DatasetRepository)
    protected datasetRepository: DatasetRepository,
  ) {}

  @get('/datasets/{pid}', {
    responses: {
      '200': {
        description: 'Dataset model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Dataset, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(@param.path.string('pid') pid: string): Promise<Dataset> {
    return this.datasetRepository.findById(pid);
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
    return this.datasetRepository.files(pid).find();
  }

  @intercept(AddScoreInterceptor.BINDING_KEY)
  @get('/datasets/', {
    responses: {
      '200': {
        description: 'Array of Dataset model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Dataset, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async getDatasets(
    @param.query.object('filter', getFilterSchemaFor(Dataset))
    filter?: Filter<Dataset>,
  ): Promise<Dataset[]> {
    return this.datasetRepository.find(filter);
  }
}
