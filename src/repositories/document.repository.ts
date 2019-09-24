import {DefaultCrudRepository} from '@loopback/repository';
import {Document, DocumentRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DocumentRepository extends DefaultCrudRepository<
  Document,
  typeof Document.prototype.pid,
  DocumentRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Document, dataSource);
  }
}
