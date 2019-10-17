import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Member extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Role: string;

  // Define well-known properties here

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
