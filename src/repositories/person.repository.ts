import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Person, PersonRelations, Member} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MemberRepository} from './member.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {
  public readonly members: HasManyRepositoryFactory<
    Member,
    typeof Person.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('MemberRepository')
    getMemberRepository: Getter<MemberRepository>,
  ) {
    super(Person, dataSource);

    this.members = this.createHasManyRepositoryFactoryFor(
      'members',
      getMemberRepository,
    );

    this.registerInclusionResolver('members', this.members.inclusionResolver);
  }
}
