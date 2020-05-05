import {Entity, model, property, hasMany} from '@loopback/repository';
import {Member, MemberWithRelations} from './member.model';

@model({settings: {strict: false}})
export class Person extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  fullName: string;

  @property({
    type: 'string',
  })
  orcid?: string;

  @property({
    type: 'string',
  })
  researcherId?: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @hasMany(() => Member)
  members?: Member[];

  // Define well-known properties here

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
  members?: MemberWithRelations[];
}

export type PersonWithRelations = Person & PersonRelations;
