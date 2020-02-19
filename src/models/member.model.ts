import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Affiliation} from './affiliation.model';
import {Person} from './person.model';

@model({settings: {strict: false}})
export class Member extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Role: string;

  // Define well-known properties here
  @hasMany(() => Affiliation)
  affiliation?: Affiliation[];

  @hasOne(() => Person)
  person?: Person[];

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Member>) {
    super(data);
  }
}

export interface MemberRelations {
  // describe navigational properties here
}

export type MemberWithRelations = Member & MemberRelations;
