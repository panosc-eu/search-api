import { Entity } from '@loopback/repository';
export declare class Role extends Entity {
    id?: string;
    description: string;
    [prop: string]: any;
    constructor(data?: Partial<Role>);
}
export interface RoleRelations {
}
export declare type RoleWithRelations = Role & RoleRelations;
