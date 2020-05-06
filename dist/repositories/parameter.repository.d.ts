import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Parameter, ParameterRelations, Dataset, Document } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DatasetRepository } from './dataset.repository';
import { DocumentRepository } from './document.repository';
export declare class ParameterRepository extends DefaultCrudRepository<Parameter, typeof Parameter.prototype.id, ParameterRelations> {
    readonly dataset: BelongsToAccessor<Dataset, typeof Parameter.prototype.id>;
    readonly document: BelongsToAccessor<Document, typeof Parameter.prototype.id>;
    constructor(dataSource: DbDataSource, getDatasetRepository: Getter<DatasetRepository>, getDocumentRepository: Getter<DocumentRepository>);
}
