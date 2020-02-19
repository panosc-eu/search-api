import {Entity, model, property, hasMany} from '@loopback/repository';
import {Member} from './member.model';
import {Dataset} from './dataset.model';

@model({settings: {strict: false}})
export class Document extends Entity {
  @property({
    type: 'string',
    id: true,
    description: 'Persistent Identifier of document',
    required: true,
    generated: false,
  })
  pid: string;

  @property({
    type: 'string',
    description: 'Type of document (proposal or publication)',
    required: true,
  })
  type: string;

  @property({
    type: 'boolean',
    description: 'condition if publically accessible',
    required: true,
  })
  isPublic: boolean;

  @property({
    type: 'string',
    description: 'title of document',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    description: 'Abstract of proposal/publication',
  })
  summary?: string;

  @property({
    type: 'string',
    description: 'digital object identifier',
  })
  doi?: string;

  @property({
    type: 'date',
    description: 'Beginning of experimental run',
  })
  startDate?: string;

  @property({
    type: 'date',
    description: 'End of experimental run',
  })
  endDate?: string;

  @property({
    type: 'date',
    description: 'End of embargo',
  })
  releaseDate?: string;

  @property({
    type: 'string',
    description: 'Conditions under which data may be used',
  })
  license?: string;

  @property.array(String, {
    description: 'keywords',
  })
  keywords?: string[];

  @hasMany(() => Member)
  member?: Member[];

  @hasMany(() => Dataset)
  dataset?: Dataset[];
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
