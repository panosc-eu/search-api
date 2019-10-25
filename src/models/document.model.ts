import {Entity, model, property, hasMany} from '@loopback/repository';
import { hasMagic } from 'glob';
import { Member } from './member.model';

@model({settings: {strict: false}})
export class Document extends Entity {
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
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  internalID?: string;

  @property({
    type: 'string',
  })
  summary?: string;

  @property({
    type: 'string',
  })
  doi?: string;

  @property({
    type: 'date',
  })
  startDate?: string;

  @property({
    type: 'date',
  })
  endDate?: string;

  @property({
    type: 'date',
  })
  releaseDate?: string;

  @property({
    type: 'string',
  })
  license?: string;

  @hasMany(() => Member)
  member?: Member[]

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Document>) {
    super(data);
  }
}

export interface DocumentRelations {
  // describe navigational properties here
}

export type DocumentWithRelations = Document & DocumentRelations;
