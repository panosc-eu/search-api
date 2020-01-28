import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Instrument extends Entity {
  @property({
    type: 'string',
    id: true,
    description: 'instrument identifier',
    required: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'string',
    description: 'instrument name',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    description: 'Facility where data was measured',
    required: true,
  })
  facility: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Instrument>) {
    super(data);
  }
}

export interface InstrumentRelations {
  // describe navigational properties here
}

export type InstrumentWithRelations = Instrument & InstrumentRelations;
