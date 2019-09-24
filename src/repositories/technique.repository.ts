import {DefaultCrudRepository} from '@loopback/repository';
import {Technique, TechniqueRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TechniqueRepository extends DefaultCrudRepository<
  Technique,
  typeof Technique.prototype.pid,
  TechniqueRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Technique, dataSource);
  }
}
