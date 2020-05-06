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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const context_1 = require("@loopback/context");
const repositories_1 = require("../repositories");
const discard_non_match_interceptor_1 = require("../interceptors/discard-non-match.interceptor");
const add_score_interceptor_1 = require("../interceptors/add-score.interceptor");
let DocumentController = class DocumentController {
    constructor(documentRepository) {
        this.documentRepository = documentRepository;
    }
    async findById(pid) {
        return this.documentRepository.findById(pid);
    }
    async find(filter) {
        return this.documentRepository.find(filter);
    }
};
__decorate([
    rest_1.get('/documents/{pid}', {
        responses: {
            '200': {
                description: 'Document model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Document, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.string('pid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], DocumentController.prototype, "findById", null);
__decorate([
    context_1.intercept(discard_non_match_interceptor_1.DiscardNonMatchInterceptor.BINDING_KEY),
    context_1.intercept(add_score_interceptor_1.AddScoreInterceptor.BINDING_KEY),
    rest_1.get('/documents', {
        responses: {
            '200': {
                description: 'Array of Document model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Document, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Document))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof repository_1.Filter !== "undefined" && repository_1.Filter) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], DocumentController.prototype, "find", null);
DocumentController = __decorate([
    __param(0, repository_1.repository(repositories_1.DocumentRepository)),
    __metadata("design:paramtypes", [repositories_1.DocumentRepository])
], DocumentController);
exports.DocumentController = DocumentController;
//# sourceMappingURL=document.controller.js.map