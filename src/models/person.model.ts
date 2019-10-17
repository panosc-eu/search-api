import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Person extends Entity {
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  surname?: string;

  @property({
    type: 'string',
  })
  orcid?: string;

  @property({
    type: 'string',
  })
  researcherid?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  publicationName?: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
