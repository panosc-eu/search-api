import {DefaultCrudRepository} from '@loopback/repository';
import {Parameter, ParameterRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParameterRepository extends DefaultCrudRepository<
  Parameter,
  typeof Parameter.prototype.id,
  ParameterRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Parameter, dataSource);
  }
}
