import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {ScicatDataSource} from '../datasources';

export interface Scicat {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  // tslint: disable-next-line:no-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDetails(title: string): Promise<any>;
}

export class ScicatProvider implements Provider<Scicat> {
  constructor(
    // scicat must match the name property in the datasource json file
    @inject('datasources.scicat')
    protected dataSource: ScicatDataSource = new ScicatDataSource(),
  ) {}

  value(): Promise<Scicat> {
    return getService(this.dataSource);
  }
}
