import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Affiliation, AffiliationRelations, Member} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
// import {MemberAffiliationRepository} from './member-affiliation.repository';
import {MemberRepository} from './member.repository';

export class AffiliationRepository extends DefaultCrudRepository<
  Affiliation,
  typeof Affiliation.prototype.id,
  AffiliationRelations
> {
  // public readonly memberAffiliations: HasManyRepositoryFactory<
  //   MemberAffiliation,
  //   typeof Affiliation.prototype.id
  // >;
  public readonly members: HasManyRepositoryFactory<
    Member,
    typeof Affiliation.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('MemberRepository')
    getMemberRepository: Getter<MemberRepository>,
    // @repository.getter('MemberAffiliationRepository')
    // getMemberAffiliationRepository: Getter<MemberAffiliationRepository>,
  ) {
    super(Affiliation, dataSource);

    this.members = this.createHasManyRepositoryFactoryFor(
      'members',
      getMemberRepository,
    );

    this.registerInclusionResolver('members', this.members.inclusionResolver);

    // this.memberAffiliations = this.createHasManyRepositoryFactoryFor(
    //   'memberAffiliations',
    //   getMemberAffiliationRepository,
    // );

    // this.registerInclusionResolver(
    //   'memberAffiliations',
    //   this.memberAffiliations.inclusionResolver,
    // );
  }
}
