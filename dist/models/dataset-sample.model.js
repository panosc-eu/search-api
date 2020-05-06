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
const dataset_model_1 = require("./dataset.model");
const sample_model_1 = require("./sample.model");
let DatasetSample = class DatasetSample extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'number',
        id: true,
        generated: false,
        required: true,
    }),
    __metadata("design:type", Number)
], DatasetSample.prototype, "id", void 0);
__decorate([
    repository_1.belongsTo(() => dataset_model_1.Dataset),
    __metadata("design:type", String)
], DatasetSample.prototype, "datasetId", void 0);
__decorate([
    repository_1.belongsTo(() => sample_model_1.Sample),
    __metadata("design:type", String)
], DatasetSample.prototype, "sampleId", void 0);
DatasetSample = __decorate([
    repository_1.model(),
    __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], DatasetSample);
exports.DatasetSample = DatasetSample;
//# sourceMappingURL=dataset-sample.model.js.map