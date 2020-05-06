import { Entity } from '@loopback/repository';
import { DatasetTechnique, DatasetTechniqueWithRelations } from './dataset-technique.model';
export declare class Technique extends Entity {
    pid: string;
    name: string;
    datasetTechniques?: DatasetTechnique[];
    [prop: string]: any;
    constructor(data?: Partial<Technique>);
}
export interface TechniqueRelations {
    datasetTechniques?: DatasetTechniqueWithRelations[];
}
export declare type TechniqueWithRelations = Technique & TechniqueRelations;
