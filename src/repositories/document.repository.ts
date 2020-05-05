import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {
  Document,
  DocumentRelations,
  Dataset,
  Parameter,
  Member,
} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DatasetRepository} from './dataset.repository';
import {ParameterRepository} from './parameter.repository';
import {MemberRepository} from './member.repository';

export class DocumentRepository extends DefaultCrudRepository<
  Document,
  typeof Document.prototype.pid,
  DocumentRelations
> {
  public readonly members: HasManyRepositoryFactory<
    Member,
    typeof Document.prototype.pid
  >;
  public readonly datasets: HasManyRepositoryFactory<
    Dataset,
    typeof Document.prototype.pid
  >;
  public readonly parameters: HasManyRepositoryFactory<
    Parameter,
    typeof Document.prototype.pid
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('MemberRepository')
    getMemberRepository: Getter<MemberRepository>,
    @repository.getter('DatasetRepository')
    getDatasetRepository: Getter<DatasetRepository>,
    @repository.getter('ParameterRepository')
    getParameterRepository: Getter<ParameterRepository>,
  ) {
    super(Document, dataSource);

    this.members = this.createHasManyRepositoryFactoryFor(
      'members',
      getMemberRepository,
    );

    this.registerInclusionResolver('members', this.members.inclusionResolver);

    this.datasets = this.createHasManyRepositoryFactoryFor(
      'datasets',
      getDatasetRepository,
    );

    this.registerInclusionResolver('datasets', this.datasets.inclusionResolver);

    this.parameters = this.createHasManyRepositoryFactoryFor(
      'parameters',
      getParameterRepository,
    );

    this.registerInclusionResolver(
      'parameters',
      this.parameters.inclusionResolver,
    );
  }
}
