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
const dataset_sample_model_1 = require("./dataset-sample.model");
let Sample = class Sample extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'string',
        description: 'Name of sample',
        required: true,
    }),
    __metadata("design:type", String)
], Sample.prototype, "name", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        description: 'Persistent identifier of sample',
        generated: false,
    }),
    __metadata("design:type", String)
], Sample.prototype, "pid", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        description: 'description of sample',
    }),
    __metadata("design:type", String)
], Sample.prototype, "description", void 0);
__decorate([
    repository_1.hasMany(() => dataset_sample_model_1.DatasetSample),
    __metadata("design:type", Array)
], Sample.prototype, "datasetSamples", void 0);
Sample = __decorate([
    repository_1.model({ settings: { strict: false } }),
    __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], Sample);
exports.Sample = Sample;
//# sourceMappingURL=sample.model.js.map