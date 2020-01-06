import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Role} from './role.model';

@model({settings: {strict: false}})
export class UserRole extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: number;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Role)
  roleId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserRole>) {
    super(data);
  }
}

export interface UserRoleRelations {
  // describe navigational properties here
}

export type UserRoleWithRelations = UserRole & UserRoleRelations;
