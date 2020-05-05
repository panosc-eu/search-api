import {Entity, model, property, hasMany} from '@loopback/repository';
import {Member, MemberWithRelations} from './member.model';

@model({settings: {strict: false}})
export class Affiliation extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
    generated: true,
  })
  id: number;

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

  @hasMany(() => Member)
  members: Member[];

  // Define well-known properties here

  constructor(data?: Partial<Affiliation>) {
    super(data);
  }
}

export interface AffiliationRelations {
  // describe navigational properties here
  members?: MemberWithRelations[];
}

export type AffiliationWithRelations = Affiliation & AffiliationRelations;
