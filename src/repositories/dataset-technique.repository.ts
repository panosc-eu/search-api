import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {
  DatasetTechnique,
  DatasetTechniqueRelations,
  Dataset,
  Technique,
} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DatasetRepository} from './dataset.repository';
import {TechniqueRepository} from './technique.repository';

export class DatasetTechniqueRepository extends DefaultCrudRepository<
  DatasetTechnique,
  typeof DatasetTechnique.prototype.id,
  DatasetTechniqueRelations
> {
  public readonly dataset: BelongsToAccessor<
    Dataset,
    typeof DatasetTechnique.prototype.id
  >;
  public readonly technique: BelongsToAccessor<
    Technique,
    typeof DatasetTechnique.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DatasetRepository')
    protected getDatasetRepository: Getter<DatasetRepository>,
    @repository.getter('TechniqueRepository')
    protected getTechniqueRepository: Getter<TechniqueRepository>,
  ) {
    super(DatasetTechnique, dataSource);

    this.dataset = this.createBelongsToAccessorFor(
      'dataset',
      getDatasetRepository,
    );

    this.registerInclusionResolver('dataset', this.dataset.inclusionResolver);

    this.technique = this.createBelongsToAccessorFor(
      'technique',
      getTechniqueRepository,
    );

    this.registerInclusionResolver(
      'technique',
      this.technique.inclusionResolver,
    );
  }
}
