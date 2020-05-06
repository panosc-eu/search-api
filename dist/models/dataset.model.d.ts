import { Entity } from '@loopback/repository';
import { Parameter, ParameterWithRelations } from './parameter.model';
import { Instrument, InstrumentWithRelations } from './instrument.model';
import { DocumentWithRelations } from './document.model';
import { File, FileWithRelations } from './file.model';
import { DatasetTechnique, DatasetTechniqueWithRelations } from './dataset-technique.model';
import { DatasetSample, DatasetSampleWithRelations } from './dataset-sample.model';
export declare class Dataset extends Entity {
    pid: string;
    title: string;
    isPublic: boolean;
    size?: number;
    creationDate?: string;
    score?: number;
    parameters?: Parameter[];
    datasetSamples?: DatasetSample[];
    documentId?: string;
    instrumentId?: Instrument;
    datasetTechniques?: DatasetTechnique[];
    files?: File[];
    [prop: string]: any;
    constructor(data?: Partial<Dataset>);
}
export interface DatasetRelations {
    parameters?: ParameterWithRelations[];
    datasetSamples?: DatasetSampleWithRelations[];
    document?: DocumentWithRelations;
    instrument?: InstrumentWithRelations;
    datasetTechniques?: DatasetTechniqueWithRelations[];
    files?: FileWithRelations[];
}
export declare type DatasetWithRelations = Dataset & DatasetRelations;
