import { Provider } from '@loopback/core';
import { ScicatDataSource } from '../datasources';
import { PanService } from './pan.service';
export interface ScicatService {
    getDetails(title: string): Promise<any>;
    getDocuments(title: string): Promise<any>;
    getInstruments(title: string): Promise<any>;
}
export declare class ScicatServiceProvider implements Provider<PanService> {
    protected dataSource: ScicatDataSource;
    constructor(dataSource?: ScicatDataSource);
    value(): Promise<PanService>;
}
