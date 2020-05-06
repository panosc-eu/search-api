import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Instrument, InstrumentRelations, Dataset } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DatasetRepository } from './dataset.repository';
export declare class InstrumentRepository extends DefaultCrudRepository<Instrument, typeof Instrument.prototype.pid, InstrumentRelations> {
    readonly datasets: HasManyRepositoryFactory<Dataset, typeof Instrument.prototype.pid>;
    constructor(dataSource: DbDataSource, getDatasetRepository: Getter<DatasetRepository>);
}
