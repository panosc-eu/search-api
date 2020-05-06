import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Sample, SampleRelations, DatasetSample } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DatasetSampleRepository } from './dataset-sample.repository';
export declare class SampleRepository extends DefaultCrudRepository<Sample, typeof Sample.prototype.pid, SampleRelations> {
    readonly datasetSamples: HasManyRepositoryFactory<DatasetSample, typeof Sample.prototype.pid>;
    constructor(dataSource: DbDataSource, getDatasetSampleRepository: Getter<DatasetSampleRepository>);
}
