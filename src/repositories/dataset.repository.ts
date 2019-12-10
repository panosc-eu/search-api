import {DefaultCrudRepository} from '@loopback/repository';
import {Dataset, DatasetRelations} from '../models';
import {inject} from '@loopback/core';
import {juggler} from '@loopback/service-proxy';
import Qty = require('js-quantities');

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
      if (Object.prototype.hasOwnProperty.call(ctx,'query')) {
        if (Object.prototype.hasOwnProperty.call(ctx.query,'where')) {
          const whereFilter = ctx.query.where;
          console.log('where', whereFilter);
          if (Object.prototype.hasOwnProperty.call(whereFilter,"and")) {
            console.log("where filter ",whereFilter["and"]);
            const andQuery = whereFilter["and"];
            andQuery.foreach((element: any) =>
            {
              console.log(element);
            })
          }
        }
        }
      const qty = new Qty('230 bar');
      console.log(new Date(Date.now()));
      console.log(qty.toString());
      console.log(qty.toBase().toString());
    });
  }
}
