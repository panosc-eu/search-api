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
const technique_model_1 = require("./technique.model");
let DatasetTechnique = class DatasetTechnique extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'number',
        id: true,
        required: true,
        generated: false,
    }),
    __metadata("design:type", Number)
], DatasetTechnique.prototype, "id", void 0);
__decorate([
    repository_1.belongsTo(() => dataset_model_1.Dataset),
    __metadata("design:type", String)
], DatasetTechnique.prototype, "datasetId", void 0);
__decorate([
    repository_1.belongsTo(() => technique_model_1.Technique),
    __metadata("design:type", String)
], DatasetTechnique.prototype, "techniqueId", void 0);
DatasetTechnique = __decorate([
    repository_1.model({ settings: { strict: false } }),
    __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], DatasetTechnique);
exports.DatasetTechnique = DatasetTechnique;
//# sourceMappingURL=dataset-technique.model.js.map