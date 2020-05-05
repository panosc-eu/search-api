/* eslint @typescript-eslint/no-explicit-any: 0 */
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
  BelongsToAccessor,
} from '@loopback/repository';
import {
  Dataset,
  DatasetRelations,
  Parameter,
  File,
  Instrument,
  Document,
  DatasetTechnique,
  DatasetSample,
} from '../models';
import {inject, Getter} from '@loopback/core';
// import {juggler} from '@loopback/service-proxy';
// import math = require('mathjs');
import {ParameterRepository} from './parameter.repository';
import {DbDataSource} from '../datasources';
import {FileRepository} from './file.repository';
import {InstrumentRepository} from './instrument.repository';
import {DocumentRepository} from './document.repository';
import {DatasetTechniqueRepository} from './dataset-technique.repository';
import {DatasetSampleRepository} from './dataset-sample.repository';

export class DatasetRepository extends DefaultCrudRepository<
  Dataset,
  typeof Dataset.prototype.pid,
  DatasetRelations
> {
  public readonly parameters: HasManyRepositoryFactory<
    Parameter,
    typeof Dataset.prototype.pid
  >;
  public readonly datasetSamples: HasManyRepositoryFactory<
    DatasetSample,
    typeof Dataset.prototype.pid
  >;
  public readonly document: BelongsToAccessor<
    Document,
    typeof Document.prototype.pid
  >;
  public readonly instrument: BelongsToAccessor<
    Instrument,
    typeof Instrument.prototype.pid
  >;
  public readonly datasetTechniques: HasManyRepositoryFactory<
    DatasetTechnique,
    typeof Dataset.prototype.pid
  >;
  public readonly files: HasManyRepositoryFactory<
    File,
    typeof Dataset.prototype.pid
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('ParameterRepository')
    getParameterRepository: Getter<ParameterRepository>,
    @repository.getter('DatasetSampleRepository')
    getDatasetSampleRepository: Getter<DatasetSampleRepository>,
    @repository.getter('DocumentRepository')
    getDocumentRepository: Getter<DocumentRepository>,
    @repository.getter('InstrumentRepository')
    getInstrumentRepository: Getter<InstrumentRepository>,
    @repository.getter('DatasetTechniqueRepository')
    getDatasetTechniqueRepository: Getter<DatasetTechniqueRepository>,
    @repository.getter('FileRepository')
    getFileRepository: Getter<FileRepository>,
  ) {
    super(Dataset, dataSource);

    this.parameters = this.createHasManyRepositoryFactoryFor(
      'parameters',
      getParameterRepository,
    );

    this.registerInclusionResolver(
      'parameters',
      this.parameters.inclusionResolver,
    );

    this.datasetSamples = this.createHasManyRepositoryFactoryFor(
      'datasetSamples',
      getDatasetSampleRepository,
    );

    this.registerInclusionResolver(
      'datasetSamples',
      this.datasetSamples.inclusionResolver,
    );

    this.document = this.createBelongsToAccessorFor(
      'document',
      getDocumentRepository,
    );

    this.registerInclusionResolver('document', this.document.inclusionResolver);

    this.instrument = this.createBelongsToAccessorFor(
      'instrument',
      getInstrumentRepository,
    );

    this.registerInclusionResolver(
      'instrument',
      this.instrument.inclusionResolver,
    );

    this.datasetTechniques = this.createHasManyRepositoryFactoryFor(
      'datasetTechniques',
      getDatasetTechniqueRepository,
    );

    this.registerInclusionResolver(
      'datasetTechniques',
      this.datasetTechniques.inclusionResolver,
    );

    this.files = this.createHasManyRepositoryFactoryFor(
      'files',
      getFileRepository,
    );

    this.registerInclusionResolver('files', this.files.inclusionResolver);

    // (this.modelClass as any).observe('access', async (ctx: any) => {
    //   if (Object.prototype.hasOwnProperty.call(ctx, 'query')) {
    //     if (Object.prototype.hasOwnProperty.call(ctx.query, 'where')) {
    //       const whereFilter = ctx.query.where;
    //       if (Object.prototype.hasOwnProperty.call(whereFilter, 'and')) {
    //         const andQuery = whereFilter['and'] as Array<Query>;
    //         const convertedQuery = convertQuery(andQuery);
    //         ctx.query.where = convertedQuery;
    //       } else {
    //         console.log();
    //         ctx.query.where = processQuery(ctx.query.where);
    //         console.log(ctx.query.where);
    //       }
    //     }
    //   }
    // });
  }
}

// function convertUnits(value: number, unit: string) {
//   const convertedQuantity = math.unit(value, unit).toSI().toString();

//   /*
//   const convertedUnit = convertedQuantity.substr(
//     convertedQuantity.indexOf(' ') + 1,
//   );
//   */
//   const convertedValue = convertedQuantity.substr(
//     0,
//     convertedQuantity.indexOf(' '),
//   );
//   return parseFloat(convertedValue);
// }

// interface Query {
//   variable: string;
//   operator: string;
//   value: number;
//   unit: string;
// }

// function processQuery(whereQuery: Query) {
//   let variable = 'pressure';
//   let operator = 'lt';
//   let value = 0;
//   let unit = 'furlongs/fortnight';

//   variable = whereQuery.variable + '.value';
//   operator = whereQuery.operator;
//   unit = whereQuery.unit;

//   value = convertUnits(whereQuery.value, unit);

//   const query = {
//     [variable]: {[operator]: value},
//   };
//   console.log(query);
//   return query;
// }

// interface Operator {
//   [x: string]: number;
// }
// interface LoopBackQuery {
//   [variable: string]: Operator;
// }

// function convertQuery(andQuery: Array<Query>) {
//   const newQuery: LoopBackQuery[] = [];
//   andQuery.forEach((element) => {
//     newQuery.push(processQuery(element));
//   });
//   console.log(newQuery);
//   return newQuery;
// }
