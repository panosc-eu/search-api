import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
} from '@loopback/rest';
import {Sample} from '../models';
import {SampleRepository} from '../repositories';

export class SampleController {
  constructor(
    @repository(SampleRepository)
    public sampleRepository: SampleRepository,
  ) {}

  @get('/samples/count', {
    responses: {
      '200': {
        description: 'Sample model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Sample))
    where?: Where<Sample>,
  ): Promise<Count> {
    return this.sampleRepository.count(where);
  }

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
    return this.sampleRepository.find(filter);
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
    return this.sampleRepository.findById(id);
  }
}
