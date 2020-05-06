import { Entity } from '@loopback/repository';
import { DatasetWithRelations } from './dataset.model';
import { SampleWithRelations } from './sample.model';
export declare class DatasetSample extends Entity {
    id: number;
    datasetId: string;
    sampleId: string;
    constructor(data?: Partial<DatasetSample>);
}
export interface DatasetSampleRelations {
    dataset?: DatasetWithRelations;
    sample?: SampleWithRelations;
}
export declare type DatasetSampleWithRelations = DatasetSample & DatasetSampleRelations;
