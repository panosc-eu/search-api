import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { DatasetSample, DatasetSampleRelations, Dataset, Sample } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DatasetRepository } from './dataset.repository';
import { SampleRepository } from './sample.repository';
export declare class DatasetSampleRepository extends DefaultCrudRepository<DatasetSample, typeof DatasetSample.prototype.id, DatasetSampleRelations> {
    readonly dataset: BelongsToAccessor<Dataset, typeof DatasetSample.prototype.id>;
    readonly sample: BelongsToAccessor<Sample, typeof DatasetSample.prototype.id>;
    constructor(dataSource: DbDataSource, getDatasetRepository: Getter<DatasetRepository>, getSampleRepository: Getter<SampleRepository>);
}
