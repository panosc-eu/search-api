import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { DatasetTechnique, DatasetTechniqueRelations, Dataset, Technique } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DatasetRepository } from './dataset.repository';
import { TechniqueRepository } from './technique.repository';
export declare class DatasetTechniqueRepository extends DefaultCrudRepository<DatasetTechnique, typeof DatasetTechnique.prototype.id, DatasetTechniqueRelations> {
    protected getDatasetRepository: Getter<DatasetRepository>;
    protected getTechniqueRepository: Getter<TechniqueRepository>;
    readonly dataset: BelongsToAccessor<Dataset, typeof DatasetTechnique.prototype.id>;
    readonly technique: BelongsToAccessor<Technique, typeof DatasetTechnique.prototype.id>;
    constructor(dataSource: DbDataSource, getDatasetRepository: Getter<DatasetRepository>, getTechniqueRepository: Getter<TechniqueRepository>);
}
