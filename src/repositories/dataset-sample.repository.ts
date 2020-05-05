import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {
  DatasetSample,
  DatasetSampleRelations,
  Dataset,
  Sample,
} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DatasetRepository} from './dataset.repository';
import {SampleRepository} from './sample.repository';

export class DatasetSampleRepository extends DefaultCrudRepository<
  DatasetSample,
  typeof DatasetSample.prototype.id,
  DatasetSampleRelations
> {
  public readonly dataset: BelongsToAccessor<
    Dataset,
    typeof DatasetSample.prototype.id
  >;
  public readonly sample: BelongsToAccessor<
    Sample,
    typeof DatasetSample.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DatasetRepository')
    getDatasetRepository: Getter<DatasetRepository>,
    @repository.getter('SampleRepository')
    getSampleRepository: Getter<SampleRepository>,
  ) {
    super(DatasetSample, dataSource);

    this.dataset = this.createBelongsToAccessorFor(
      'dataset',
      getDatasetRepository,
    );

    this.registerInclusionResolver('dataset', this.dataset.inclusionResolver);

    this.sample = this.createBelongsToAccessorFor(
      'sample',
      getSampleRepository,
    );

    this.registerInclusionResolver('sample', this.sample.inclusionResolver);
  }
}
