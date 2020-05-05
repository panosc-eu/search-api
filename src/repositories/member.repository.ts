import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  Member,
  MemberRelations,
  Document,
  Person,
  Affiliation,
} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DocumentRepository} from './document.repository';
import {PersonRepository} from './person.repository';
import {AffiliationRepository} from './affiliation.repository';

export class MemberRepository extends DefaultCrudRepository<
  Member,
  typeof Member.prototype.id,
  MemberRelations
> {
  public readonly document: BelongsToAccessor<
    Document,
    typeof Member.prototype.id
  >;
  public readonly affiliation: BelongsToAccessor<
    Affiliation,
    typeof Member.prototype.id
  >;
  public readonly person: BelongsToAccessor<Person, typeof Member.prototype.id>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DocumentRepository')
    getDocumentRepository: Getter<DocumentRepository>,
    @repository.getter('AffiliationRepository')
    getAffiliationRepository: Getter<AffiliationRepository>,
    @repository.getter('PersonRepository')
    getPersonRepository: Getter<PersonRepository>,
  ) {
    super(Member, dataSource);

    this.document = this.createBelongsToAccessorFor(
      'document',
      getDocumentRepository,
    );

    this.registerInclusionResolver('document', this.document.inclusionResolver);

    this.affiliation = this.createBelongsToAccessorFor(
      'affiliation',
      getAffiliationRepository,
    );

    this.registerInclusionResolver(
      'affiliation',
      this.affiliation.inclusionResolver,
    );

    this.person = this.createBelongsToAccessorFor(
      'person',
      getPersonRepository,
    );

    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
