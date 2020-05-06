import { DefaultCrudRepository } from '@loopback/repository';
import { Role, RoleRelations } from '../models';
import { DbDataSource } from '../datasources';
export declare class RoleRepository extends DefaultCrudRepository<Role, typeof Role.prototype.id, RoleRelations> {
    constructor(dataSource: DbDataSource);
}
