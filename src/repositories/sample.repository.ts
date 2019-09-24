import {DefaultCrudRepository} from '@loopback/repository';
import {Sample, SampleRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SampleRepository extends DefaultCrudRepository<
  Sample,
  typeof Sample.prototype.pid,
  SampleRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Sample, dataSource);
  }
}
