import { Entity } from '@loopback/repository';
import { Dataset, DatasetWithRelations } from './dataset.model';
export declare class Instrument extends Entity {
    pid: string;
    name: string;
    facility: string;
    score: number;
    datasets?: Dataset[];
    [prop: string]: any;
    constructor(data?: Partial<Instrument>);
}
export interface InstrumentRelations {
    dataset?: DatasetWithRelations;
}
export declare type InstrumentWithRelations = Instrument & InstrumentRelations;
