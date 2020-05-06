import { Provider, BindingTemplate } from '@loopback/core';
export interface PanService {
    getDetails(title: string): Promise<any>;
    getDocuments(title: string): Promise<any>;
    getInstruments(title: string): Promise<any>;
}
export declare const PAN_SERVICE = "PanService";
/**
 * A binding template for recommender service extensions
 */
export declare function pan(protocol: string): BindingTemplate<unknown>;
export declare class PanServiceProvider implements Provider<PanService> {
    private panServices;
    constructor(panServices: PanService[]);
    value(): PanService;
}
