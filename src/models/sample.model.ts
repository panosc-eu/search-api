import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Sample extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  pid?: string;

  @property({
    type: 'string',
  })
  description?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Sample>) {
    super(data);
  }
}

export interface SampleRelations {
  // describe navigational properties here
}

export type SampleWithRelations = Sample & SampleRelations;
