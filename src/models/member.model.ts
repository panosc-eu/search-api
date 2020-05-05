import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Document, DocumentWithRelations} from './document.model';
import {Person, PersonWithRelations} from './person.model';
import {Affiliation, AffiliationWithRelations} from './affiliation.model';

@model({settings: {strict: false}})
export class Member extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
    generated: false,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @belongsTo(() => Document)
  documentId: string;

  @belongsTo(() => Person)
  personId: string;

  @belongsTo(() => Affiliation)
  affiliationId?: number;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Member>) {
    super(data);
  }
}

export interface MemberRelations {
  // describe navigational properties here
  document?: DocumentWithRelations;
  person?: PersonWithRelations;
  affiliation?: AffiliationWithRelations;
}

export type MemberWithRelations = Member & MemberRelations;
