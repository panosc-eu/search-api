import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {Parameter, ParameterRelations, Dataset, Document} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DatasetRepository} from './dataset.repository';
import {DocumentRepository} from './document.repository';

export class ParameterRepository extends DefaultCrudRepository<
  Parameter,
  typeof Parameter.prototype.id,
  ParameterRelations
> {
  public readonly dataset: BelongsToAccessor<
    Dataset,
    typeof Parameter.prototype.id
  >;
  public readonly document: BelongsToAccessor<
    Document,
    typeof Parameter.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DatasetRepository')
    getDatasetRepository: Getter<DatasetRepository>,
    @repository.getter('DocumentRepository')
    getDocumentRepository: Getter<DocumentRepository>,
  ) {
    super(Parameter, dataSource);

    this.dataset = this.createBelongsToAccessorFor(
      'dataset',
      getDatasetRepository,
    );

    this.registerInclusionResolver('dataset', this.dataset.inclusionResolver);

    this.document = this.createBelongsToAccessorFor(
      'document',
      getDocumentRepository,
    );

    this.registerInclusionResolver('document', this.document.inclusionResolver);
  }
}
