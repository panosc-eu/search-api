import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Member, MemberRelations, Document, Person, Affiliation } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DocumentRepository } from './document.repository';
import { PersonRepository } from './person.repository';
import { AffiliationRepository } from './affiliation.repository';
export declare class MemberRepository extends DefaultCrudRepository<Member, typeof Member.prototype.id, MemberRelations> {
    readonly document: BelongsToAccessor<Document, typeof Member.prototype.id>;
    readonly affiliation: BelongsToAccessor<Affiliation, typeof Member.prototype.id>;
    readonly person: BelongsToAccessor<Person, typeof Member.prototype.id>;
    constructor(dataSource: DbDataSource, getDocumentRepository: Getter<DocumentRepository>, getAffiliationRepository: Getter<AffiliationRepository>, getPersonRepository: Getter<PersonRepository>);
}
