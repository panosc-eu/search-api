import {Entity, model, property, hasMany} from '@loopback/repository';
import {Member, MemberWithRelations} from './member.model';
import {Dataset, DatasetWithRelations} from './dataset.model';
import {Parameter, ParameterWithRelations} from './parameter.model';

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

  @property({
    type: 'number',
    description: 'score of how well document is mathing the query',
  })
  score: number;

  @hasMany(() => Member)
  members?: Member[];

  @hasMany(() => Dataset)
  datasets?: Dataset[];

  @hasMany(() => Parameter)
  parameters?: Parameter[];

  // Define well-known properties here

  constructor(data?: Partial<Document>) {
    super(data);
  }
}

export interface DocumentRelations {
  // describe navigational properties here
  members?: MemberWithRelations[];
  datasets?: DatasetWithRelations[];
  parameters?: ParameterWithRelations[];
}

export type DocumentWithRelations = Document & DocumentRelations;
