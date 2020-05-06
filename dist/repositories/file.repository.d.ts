import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { File, FileRelations, Dataset } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DatasetRepository } from './dataset.repository';
export declare class FileRepository extends DefaultCrudRepository<File, typeof File.prototype.id, FileRelations> {
    readonly dataset: BelongsToAccessor<Dataset, typeof Dataset.prototype.pid>;
    constructor(dataSource: DbDataSource, getDatasetRepository: Getter<DatasetRepository>);
}
