import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {File, FileRelations, Dataset} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DatasetRepository} from './dataset.repository';

export class FileRepository extends DefaultCrudRepository<
  File,
  typeof File.prototype.id,
  FileRelations
> {
  public readonly dataset: BelongsToAccessor<
    Dataset,
    typeof Dataset.prototype.pid
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DatasetRepository')
    getDatasetRepository: Getter<DatasetRepository>,
  ) {
    super(File, dataSource);

    this.dataset = this.createBelongsToAccessorFor(
      'dataset',
      getDatasetRepository,
    );

    this.registerInclusionResolver('dataset', this.dataset.inclusionResolver);
  }
}
