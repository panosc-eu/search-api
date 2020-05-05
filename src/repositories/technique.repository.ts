import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Technique, TechniqueRelations, DatasetTechnique} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DatasetTechniqueRepository} from './dataset-technique.repository';

export class TechniqueRepository extends DefaultCrudRepository<
  Technique,
  typeof Technique.prototype.pid,
  TechniqueRelations
> {
  public readonly datasetTechniques: HasManyRepositoryFactory<
    DatasetTechnique,
    typeof Technique.prototype.pid
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DatasetTechniqueRepository')
    protected getDatasetTechniqueRepository: Getter<DatasetTechniqueRepository>,
  ) {
    super(Technique, dataSource);

    this.datasetTechniques = this.createHasManyRepositoryFactoryFor(
      'datasetTechniques',
      getDatasetTechniqueRepository,
    );

    this.registerInclusionResolver(
      'datasetTechniques',
      this.datasetTechniques.inclusionResolver,
    );
  }
}
