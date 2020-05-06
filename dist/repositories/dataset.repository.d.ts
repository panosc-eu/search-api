import { DefaultCrudRepository, HasManyRepositoryFactory, BelongsToAccessor } from '@loopback/repository';
import { Dataset, DatasetRelations, Parameter, File, Instrument, Document, DatasetTechnique, DatasetSample } from '../models';
import { Getter } from '@loopback/core';
import { ParameterRepository } from './parameter.repository';
import { DbDataSource } from '../datasources';
import { FileRepository } from './file.repository';
import { InstrumentRepository } from './instrument.repository';
import { DocumentRepository } from './document.repository';
import { DatasetTechniqueRepository } from './dataset-technique.repository';
import { DatasetSampleRepository } from './dataset-sample.repository';
export declare class DatasetRepository extends DefaultCrudRepository<Dataset, typeof Dataset.prototype.pid, DatasetRelations> {
    readonly parameters: HasManyRepositoryFactory<Parameter, typeof Dataset.prototype.pid>;
    readonly datasetSamples: HasManyRepositoryFactory<DatasetSample, typeof Dataset.prototype.pid>;
    readonly document: BelongsToAccessor<Document, typeof Document.prototype.pid>;
    readonly instrument: BelongsToAccessor<Instrument, typeof Instrument.prototype.pid>;
    readonly datasetTechniques: HasManyRepositoryFactory<DatasetTechnique, typeof Dataset.prototype.pid>;
    readonly files: HasManyRepositoryFactory<File, typeof Dataset.prototype.pid>;
    constructor(dataSource: DbDataSource, getParameterRepository: Getter<ParameterRepository>, getDatasetSampleRepository: Getter<DatasetSampleRepository>, getDocumentRepository: Getter<DocumentRepository>, getInstrumentRepository: Getter<InstrumentRepository>, getDatasetTechniqueRepository: Getter<DatasetTechniqueRepository>, getFileRepository: Getter<FileRepository>);
}
