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
const member_model_1 = require("./member.model");
const dataset_model_1 = require("./dataset.model");
const parameter_model_1 = require("./parameter.model");
let Document = class Document extends repository_1.Entity {
    // Define well-known properties here
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        description: 'Persistent Identifier of document',
        required: true,
        generated: false,
    }),
    __metadata("design:type", String)
], Document.prototype, "pid", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        description: 'Type of document (proposal or publication)',
        required: true,
    }),
    __metadata("design:type", String)
], Document.prototype, "type", void 0);
__decorate([
    repository_1.property({
        type: 'boolean',
        description: 'condition if publically accessible',
        required: true,
    }),
    __metadata("design:type", Boolean)
], Document.prototype, "isPublic", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        description: 'title of document',
        required: true,
    }),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        description: 'Abstract of proposal/publication',
    }),
    __metadata("design:type", String)
], Document.prototype, "summary", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        description: 'digital object identifier',
    }),
    __metadata("design:type", String)
], Document.prototype, "doi", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        description: 'Beginning of experimental run',
    }),
    __metadata("design:type", String)
], Document.prototype, "startDate", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        description: 'End of experimental run',
    }),
    __metadata("design:type", String)
], Document.prototype, "endDate", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        description: 'End of embargo',
    }),
    __metadata("design:type", String)
], Document.prototype, "releaseDate", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        description: 'Conditions under which data may be used',
    }),
    __metadata("design:type", String)
], Document.prototype, "license", void 0);
__decorate([
    repository_1.property.array(String, {
        description: 'keywords',
    }),
    __metadata("design:type", Array)
], Document.prototype, "keywords", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        description: 'score of how well document is mathing the query',
    }),
    __metadata("design:type", Number)
], Document.prototype, "score", void 0);
__decorate([
    repository_1.hasMany(() => member_model_1.Member),
    __metadata("design:type", Array)
], Document.prototype, "members", void 0);
__decorate([
    repository_1.hasMany(() => dataset_model_1.Dataset),
    __metadata("design:type", Array)
], Document.prototype, "datasets", void 0);
__decorate([
    repository_1.hasMany(() => parameter_model_1.Parameter),
    __metadata("design:type", Array)
], Document.prototype, "parameters", void 0);
Document = __decorate([
    repository_1.model({ settings: { strict: false } }),
    __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], Document);
exports.Document = Document;
//# sourceMappingURL=document.model.js.map