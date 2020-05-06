"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint @typescript-eslint/no-explicit-any: 0 */
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const core_1 = require("@loopback/core");
const datasources_1 = require("../datasources");
let DatasetRepository = class DatasetRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, getParameterRepository, getDatasetSampleRepository, getDocumentRepository, getInstrumentRepository, getDatasetTechniqueRepository, getFileRepository) {
        super(models_1.Dataset, dataSource);
        this.parameters = this.createHasManyRepositoryFactoryFor('parameters', getParameterRepository);
        this.registerInclusionResolver('parameters', this.parameters.inclusionResolver);
        this.datasetSamples = this.createHasManyRepositoryFactoryFor('datasetSamples', getDatasetSampleRepository);
        this.registerInclusionResolver('datasetSamples', this.datasetSamples.inclusionResolver);
        this.document = this.createBelongsToAccessorFor('document', getDocumentRepository);
        this.registerInclusionResolver('document', this.document.inclusionResolver);
        this.instrument = this.createBelongsToAccessorFor('instrument', getInstrumentRepository);
        this.registerInclusionResolver('instrument', this.instrument.inclusionResolver);
        this.datasetTechniques = this.createHasManyRepositoryFactoryFor('datasetTechniques', getDatasetTechniqueRepository);
        this.registerInclusionResolver('datasetTechniques', this.datasetTechniques.inclusionResolver);
        this.files = this.createHasManyRepositoryFactoryFor('files', getFileRepository);
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
};
DatasetRepository = __decorate([
    __param(0, core_1.inject('datasources.db')),
    __param(1, repository_1.repository.getter('ParameterRepository')),
    __param(2, repository_1.repository.getter('DatasetSampleRepository')),
    __param(3, repository_1.repository.getter('DocumentRepository')),
    __param(4, repository_1.repository.getter('InstrumentRepository')),
    __param(5, repository_1.repository.getter('DatasetTechniqueRepository')),
    __param(6, repository_1.repository.getter('FileRepository')),
    __metadata("design:paramtypes", [datasources_1.DbDataSource, typeof (_a = typeof core_1.Getter !== "undefined" && core_1.Getter) === "function" ? _a : Object, typeof (_b = typeof core_1.Getter !== "undefined" && core_1.Getter) === "function" ? _b : Object, typeof (_c = typeof core_1.Getter !== "undefined" && core_1.Getter) === "function" ? _c : Object, typeof (_d = typeof core_1.Getter !== "undefined" && core_1.Getter) === "function" ? _d : Object, typeof (_e = typeof core_1.Getter !== "undefined" && core_1.Getter) === "function" ? _e : Object, typeof (_f = typeof core_1.Getter !== "undefined" && core_1.Getter) === "function" ? _f : Object])
], DatasetRepository);
exports.DatasetRepository = DatasetRepository;
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
//# sourceMappingURL=dataset.repository.js.map