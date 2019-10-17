import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Affiliation extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  country?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Affiliation>) {
    super(data);
  }
}

export interface AffiliationRelations {
  // describe navigational properties here
}

export type AffiliationWithRelations = Affiliation & AffiliationRelations;
