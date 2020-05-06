import { Entity } from '@loopback/repository';
export declare class UserRole extends Entity {
    id?: number;
    userId: string;
    roleId: string;
    [prop: string]: any;
    constructor(data?: Partial<UserRole>);
}
export interface UserRoleRelations {
}
export declare type UserRoleWithRelations = UserRole & UserRoleRelations;
