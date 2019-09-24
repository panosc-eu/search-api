import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Technique extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    generated: false,
  })
  pid: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Technique>) {
    super(data);
  }
}

export interface TechniqueRelations {
  // describe navigational properties here
}

export type TechniqueWithRelations = Technique & TechniqueRelations;
