import {Filter, repository} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
} from '@loopback/rest';
import {Instrument} from '../models';
import {InstrumentRepository} from '../repositories';

export class InstrumentController {
  constructor(
    @repository(InstrumentRepository)
    public instrumentRepository: InstrumentRepository,
  ) {}

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

  @get('/instruments/{pid}', {
    responses: {
      '200': {
        description: 'Instrument model instance',
        content: {'application/json': {schema: getModelSchemaRef(Instrument)}},
      },
    },
  })
  async findById(@param.path.string('pid') pid: string): Promise<Instrument> {
    return this.instrumentRepository.findById(pid);
  }
}
