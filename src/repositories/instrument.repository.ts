import {DefaultCrudRepository} from '@loopback/repository';
import {Instrument, InstrumentRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InstrumentRepository extends DefaultCrudRepository<
  Instrument,
  typeof Instrument.prototype.id,
  InstrumentRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Instrument, dataSource);
  }
}
