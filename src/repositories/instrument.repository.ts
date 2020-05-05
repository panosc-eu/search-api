import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Instrument, InstrumentRelations, Dataset} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DatasetRepository} from './dataset.repository';

export class InstrumentRepository extends DefaultCrudRepository<
  Instrument,
  typeof Instrument.prototype.pid,
  InstrumentRelations
> {
  public readonly datasets: HasManyRepositoryFactory<
    Dataset,
    typeof Instrument.prototype.pid
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('DatasetRepository')
    getDatasetRepository: Getter<DatasetRepository>,
  ) {
    super(Instrument, dataSource);

    this.datasets = this.createHasManyRepositoryFactoryFor(
      'datasets',
      getDatasetRepository,
    );

    this.registerInclusionResolver('datasets', this.datasets.inclusionResolver);
  }
}
