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
import {Instrument} from '../models';
import {InstrumentRepository} from '../repositories';

export class InstrumentController {
  constructor(
    @repository(InstrumentRepository)
    public instrumentRepository: InstrumentRepository,
  ) {}

  @post('/instruments', {
    responses: {
      '200': {
        description: 'Instrument model instance',
        content: {'application/json': {schema: getModelSchemaRef(Instrument)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Instrument, {
            title: 'NewInstrument',
          }),
        },
      },
    })
    instrument: Instrument,
  ): Promise<Instrument> {
    return this.instrumentRepository.create(instrument);
  }

  @get('/instruments/count', {
    responses: {
      '200': {
        description: 'Instrument model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Instrument))
    where?: Where<Instrument>,
  ): Promise<Count> {
    return this.instrumentRepository.count(where);
  }

  @get('/instruments', {
    responses: {
      '200': {
        description: 'Array of Instrument model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Instrument)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Instrument))
    filter?: Filter<Instrument>,
  ): Promise<Instrument[]> {
    return this.instrumentRepository.find(filter);
  }

  @patch('/instruments', {
    responses: {
      '200': {
        description: 'Instrument PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Instrument, {partial: true}),
        },
      },
    })
    instrument: Instrument,
    @param.query.object('where', getWhereSchemaFor(Instrument))
    where?: Where<Instrument>,
  ): Promise<Count> {
    return this.instrumentRepository.updateAll(instrument, where);
  }

  @get('/instruments/{id}', {
    responses: {
      '200': {
        description: 'Instrument model instance',
        content: {'application/json': {schema: getModelSchemaRef(Instrument)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Instrument> {
    return this.instrumentRepository.findById(id);
  }

  @patch('/instruments/{id}', {
    responses: {
      '204': {
        description: 'Instrument PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Instrument, {partial: true}),
        },
      },
    })
    instrument: Instrument,
  ): Promise<void> {
    await this.instrumentRepository.updateById(id, instrument);
  }

  @put('/instruments/{id}', {
    responses: {
      '204': {
        description: 'Instrument PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() instrument: Instrument,
  ): Promise<void> {
    await this.instrumentRepository.replaceById(id, instrument);
  }

  @del('/instruments/{id}', {
    responses: {
      '204': {
        description: 'Instrument DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.instrumentRepository.deleteById(id);
  }
}
