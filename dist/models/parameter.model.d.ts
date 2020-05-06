import { Entity } from '@loopback/repository';
import { DatasetWithRelations } from './dataset.model';
import { DocumentWithRelations } from './document.model';
export declare class Parameter extends Entity {
    id: number;
    name: string;
    value: number | string;
    unit?: string;
    datasetId?: string;
    documentId?: string;
    [prop: string]: any;
    constructor(data?: Partial<Parameter>);
}
export interface ParameterRelations {
    dataset?: DatasetWithRelations;
    document?: DocumentWithRelations;
}
export declare type ParameterWithRelations = Parameter & ParameterRelations;
