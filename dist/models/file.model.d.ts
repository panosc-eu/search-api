import { Entity } from '@loopback/repository';
import { DatasetWithRelations } from './dataset.model';
export declare class File extends Entity {
    id: string;
    name: string;
    path?: string;
    size?: number;
    datasetId: string;
    [prop: string]: any;
    constructor(data?: Partial<File>);
}
export interface FileRelations {
    dataset?: DatasetWithRelations;
}
export declare type FileWithRelations = File & FileRelations;
