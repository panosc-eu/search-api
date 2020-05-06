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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const parameter_model_1 = require("./parameter.model");
const instrument_model_1 = require("./instrument.model");
const document_model_1 = require("./document.model");
const file_model_1 = require("./file.model");
const dataset_technique_model_1 = require("./dataset-technique.model");
const dataset_sample_model_1 = require("./dataset-sample.model");
let Dataset = class Dataset extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        required: true,
        description: 'persistent identifier for dataset',
        generated: false,
    }),
    __metadata("design:type", String)
], Dataset.prototype, "pid", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        description: 'dataset title',
        required: true,
    }),
    __metadata("design:type", String)
], Dataset.prototype, "title", void 0);
__decorate([
    repository_1.property({
        type: 'boolean',
        description: 'condition if publically accessible',
        required: true,
    }),
    __metadata("design:type", Boolean)
], Dataset.prototype, "isPublic", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        description: 'size in bytes of dataset',
        required: true,
    }),
    __metadata("design:type", Number)
], Dataset.prototype, "size", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        description: 'date and time dataset was created',
        required: true,
    }),
    __metadata("design:type", String)
], Dataset.prototype, "creationDate", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        description: 'score of how well dataset is mathing the query',
    }),
    __metadata("design:type", Number)
], Dataset.prototype, "score", void 0);
__decorate([
    repository_1.hasMany(() => parameter_model_1.Parameter),
    __metadata("design:type", Array)
], Dataset.prototype, "parameters", void 0);
__decorate([
    repository_1.hasMany(() => dataset_sample_model_1.DatasetSample),
    __metadata("design:type", Array)
], Dataset.prototype, "datasetSamples", void 0);
__decorate([
    repository_1.belongsTo(() => document_model_1.Document),
    __metadata("design:type", String)
], Dataset.prototype, "documentId", void 0);
__decorate([
    repository_1.belongsTo(() => instrument_model_1.Instrument),
    __metadata("design:type", instrument_model_1.Instrument)
], Dataset.prototype, "instrumentId", void 0);
__decorate([
    repository_1.hasMany(() => dataset_technique_model_1.DatasetTechnique),
    __metadata("design:type", Array)
], Dataset.prototype, "datasetTechniques", void 0);
__decorate([
    repository_1.hasMany(() => file_model_1.File),
    __metadata("design:type", Array)
], Dataset.prototype, "files", void 0);
Dataset = __decorate([
    repository_1.model({
        settings: {
            strict: false,
            description: 'information about an experimental run, including optional File,\
       Sample, Instrument and Technique',
        },
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], Dataset);
exports.Dataset = Dataset;
//# sourceMappingURL=dataset.model.js.map