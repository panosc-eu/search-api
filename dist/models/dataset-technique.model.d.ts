import { Entity } from '@loopback/repository';
import { DatasetWithRelations } from './dataset.model';
import { TechniqueWithRelations } from './technique.model';
export declare class DatasetTechnique extends Entity {
    id: number;
    datasetId: string;
    techniqueId: string;
    constructor(data?: Partial<DatasetTechnique>);
}
export interface DatasetTechniqueRelations {
    dataset?: DatasetWithRelations;
    technique?: TechniqueWithRelations;
}
export declare type DatasetTechniqueWithRelations = DatasetTechnique & DatasetTechniqueRelations;
