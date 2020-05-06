import { Entity } from '@loopback/repository';
import { DatasetSample, DatasetSampleWithRelations } from './dataset-sample.model';
export declare class Sample extends Entity {
    name: string;
    pid?: string;
    description?: string;
    datasetSamples?: DatasetSample[];
    [prop: string]: any;
    constructor(data?: Partial<Sample>);
}
export interface SampleRelations {
    datasetSamples?: DatasetSampleWithRelations[];
}
export declare type SampleWithRelations = Sample & SampleRelations;
