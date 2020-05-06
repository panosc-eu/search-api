import { Filter, Condition } from '@loopback/repository';
import { Dataset, File, Document, Instrument } from './models';
import { SciCatDataset, SciCatSample, SciCatPublishedData, SciCatInstrument } from './scicat-interfaces';
import { PanSample } from './pan-interfaces';
export interface Query {
    variable: string;
    operator: string;
    value: number;
    unit: string;
}
export interface Loopback3Query {
    include?: Object;
    limit?: number;
    offset?: number;
    skip?: number;
    where?: Object;
}
export interface Operator {
    [x: string]: number;
}
export interface LoopBackQuery {
    [variable: string]: Operator;
}
export declare function convertUnits(name: string, value: number, unit: string): number;
export declare function convertNameforScicat(panoscName: string, type: 'string' | 'number' | 'quantity'): string;
export declare function convertQueryForSciCat(filter?: Filter<Dataset>): string;
export declare function mapPanPropertiesToScicatProperties(where: Condition<Filter>): Condition<import("@loopback/repository").AnyObject>;
export declare function idquery(pid: string): string;
export declare function convertDatasetToPaN(scicatDataset: SciCatDataset): Dataset;
export declare function getPaNFilesFromDataset(scicatDataset: SciCatDataset): File[];
export declare function convertSampleToPaN(scicatSample: SciCatSample): PanSample;
export declare function convertDocumentToPaN(scicatPub: SciCatPublishedData): Document;
export declare function convertInstrumentToPaN(scicatInstrument: SciCatInstrument): Instrument;
