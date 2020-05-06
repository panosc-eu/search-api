import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Affiliation, AffiliationRelations, Member } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { MemberRepository } from './member.repository';
export declare class AffiliationRepository extends DefaultCrudRepository<Affiliation, typeof Affiliation.prototype.id, AffiliationRelations> {
    readonly members: HasManyRepositoryFactory<Member, typeof Affiliation.prototype.id>;
    constructor(dataSource: DbDataSource, getMemberRepository: Getter<MemberRepository>);
}
