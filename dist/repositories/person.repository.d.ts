import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Person, PersonRelations, Member } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { MemberRepository } from './member.repository';
export declare class PersonRepository extends DefaultCrudRepository<Person, typeof Person.prototype.id, PersonRelations> {
    readonly members: HasManyRepositoryFactory<Member, typeof Person.prototype.id>;
    constructor(dataSource: DbDataSource, getMemberRepository: Getter<MemberRepository>);
}
