import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Sample} from '../models';
import {SampleRepository} from '../repositories';

export class SampleController {
  constructor(
    @repository(SampleRepository)
    public sampleRepository: SampleRepository,
  ) {}

  @post('/samples', {
    responses: {
      '200': {
        description: 'Sample model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sample)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sample, {
            title: 'NewSample',
          }),
        },
      },
    })
    sample: Sample,
  ): Promise<Sample> {
    return this.sampleRepository.create(sample);
  }

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

  @patch('/samples', {
    responses: {
      '200': {
        description: 'Sample PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sample, {partial: true}),
        },
      },
    })
    sample: Sample,
    @param.query.object('where', getWhereSchemaFor(Sample))
    where?: Where<Sample>,
  ): Promise<Count> {
    return this.sampleRepository.updateAll(sample, where);
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

  @patch('/samples/{id}', {
    responses: {
      '204': {
        description: 'Sample PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sample, {partial: true}),
        },
      },
    })
    sample: Sample,
  ): Promise<void> {
    await this.sampleRepository.updateById(id, sample);
  }

  @put('/samples/{id}', {
    responses: {
      '204': {
        description: 'Sample PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sample: Sample,
  ): Promise<void> {
    await this.sampleRepository.replaceById(id, sample);
  }

  @del('/samples/{id}', {
    responses: {
      '204': {
        description: 'Sample DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sampleRepository.deleteById(id);
  }
}
