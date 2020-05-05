import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Sample, SampleRelations, DatasetSample} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DatasetSampleRepository} from './dataset-sample.repository';

export class SampleRepository extends DefaultCrudRepository<
  Sample,
  typeof Sample.prototype.pid,
  SampleRelations
> {
  public readonly datasetSamples: HasManyRepositoryFactory<
    DatasetSample,
    typeof Sample.prototype.pid
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DatasetSampleRepository')
    getDatasetSampleRepository: Getter<DatasetSampleRepository>,
  ) {
    super(Sample, dataSource);

    this.datasetSamples = this.createHasManyRepositoryFactoryFor(
      'datasetSamples',
      getDatasetSampleRepository,
    );

    this.registerInclusionResolver(
      'datasetSamples',
      this.datasetSamples.inclusionResolver,
    );
  }
}
