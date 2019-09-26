import {DefaultCrudRepository} from '@loopback/repository';
import {File, FileRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FileRepository extends DefaultCrudRepository<
  File,
  typeof File.prototype.id,
  FileRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(File, dataSource);
  }
}
