import {Filter} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
} from '@loopback/rest';
import {Instrument} from '../models';
import {inject} from '@loopback/core';
import {PanService} from '../services';
import {SciCatInstrument} from '../scicat-interfaces';
import {convertInstrumentToPaN, convertQueryForSciCat} from '../utils';

export class InstrumentController {
  constructor(
    @inject('services.PanService')
    protected panService: PanService,
  ) {}

  @get('/instruments/{pid}', {
    responses: {
      '200': {
        description: 'Instrument model instance',
        content: {'application/json': {schema: getModelSchemaRef(Instrument)}},
      },
    },
  })
  async findById(@param.path.string('pid') pid: string): Promise<Instrument> {
    return this.getInstrumentById(pid);
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
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let fullQuery = '';
    if (config === 'scicat') {
      fullQuery = convertQueryForSciCat(filter);
    } else if (config === 'local') {
      // search locally
    }

    return this.getInstruments(fullQuery);
  }

  async getInstrumentById(pid: string): Promise<Instrument> {
    return this.panService
      .getInstruments(JSON.stringify({where: {pid}}))
      .then(res =>
        convertInstrumentToPaN(
          res.find((instrument: SciCatInstrument) => instrument.pid === pid),
        ),
      );
  }

  async getInstruments(query: string): Promise<Instrument[]> {
    return this.panService
      .getInstruments(query)
      .then(res =>
        res.map((instrument: SciCatInstrument) =>
          convertInstrumentToPaN(instrument),
        ),
      );
  }
}
