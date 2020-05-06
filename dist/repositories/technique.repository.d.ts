import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Technique, TechniqueRelations, DatasetTechnique } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DatasetTechniqueRepository } from './dataset-technique.repository';
export declare class TechniqueRepository extends DefaultCrudRepository<Technique, typeof Technique.prototype.pid, TechniqueRelations> {
    protected getDatasetTechniqueRepository: Getter<DatasetTechniqueRepository>;
    readonly datasetTechniques: HasManyRepositoryFactory<DatasetTechnique, typeof Technique.prototype.pid>;
    constructor(dataSource: DbDataSource, getDatasetTechniqueRepository: Getter<DatasetTechniqueRepository>);
}
