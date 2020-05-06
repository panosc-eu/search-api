import { CommonApiApplication } from '../..';
import { Client } from '@loopback/testlab';
import { Dataset } from '../../models';
export declare function setupApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    app: CommonApiApplication;
    client: Client;
}
export declare function givenDataset(dataset?: Partial<Dataset>): Dataset;
