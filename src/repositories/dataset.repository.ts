import {DefaultCrudRepository} from '@loopback/repository';
import {Dataset, DatasetRelations} from '../models';
import {inject} from '@loopback/core';
import {juggler} from '@loopback/service-proxy';
import Qty = require('js-quantities');
import {createGzip} from 'zlib';

export class DatasetRepository extends DefaultCrudRepository<
  Dataset,
  typeof Dataset.prototype.pid,
  DatasetRelations
> {
  constructor(@inject('datasources.db') dataSource: juggler.DataSource) {
    super(Dataset, dataSource);

    (this.modelClass as any).observe('access', async (ctx: any) => {
      console.log('Going to convert units for %s', ctx.Model.modelName);
      console.log('units');
      console.log('ctx', ctx.query);
      if (ctx.hasOwnProperty('query')) {
        if (ctx.query.hasOwnProperty('where')) {
          const whereFilter = ctx.query.where;
          console.log('where', whereFilter);
        }
      }
      const qty = new Qty('23 bar');
      console.log(qty.toString());
      console.log(qty.toBase().toString());
    });
  }
}
