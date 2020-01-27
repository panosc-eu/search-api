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
import {Instrument} from '../models';
import {InstrumentRepository} from '../repositories';

export class InstrumentController {
  constructor(
    @repository(InstrumentRepository)
    public instrumentRepository: InstrumentRepository,
  ) {}

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
}
