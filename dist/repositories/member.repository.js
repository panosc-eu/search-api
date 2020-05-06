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
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let MemberRepository = class MemberRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, getDocumentRepository, getAffiliationRepository, getPersonRepository) {
        super(models_1.Member, dataSource);
        this.document = this.createBelongsToAccessorFor('document', getDocumentRepository);
        this.registerInclusionResolver('document', this.document.inclusionResolver);
        this.affiliation = this.createBelongsToAccessorFor('affiliation', getAffiliationRepository);
        this.registerInclusionResolver('affiliation', this.affiliation.inclusionResolver);
        this.person = this.createBelongsToAccessorFor('person', getPersonRepository);
        this.registerInclusionResolver('person', this.person.inclusionResolver);
    }
};
MemberRepository = __decorate([
    __param(0, core_1.inject('datasources.db')),
    __param(1, repository_1.repository.getter('DocumentRepository')),
    __param(2, repository_1.repository.getter('AffiliationRepository')),
    __param(3, repository_1.repository.getter('PersonRepository')),
    __metadata("design:paramtypes", [datasources_1.DbDataSource, typeof (_a = typeof core_1.Getter !== "undefined" && core_1.Getter) === "function" ? _a : Object, typeof (_b = typeof core_1.Getter !== "undefined" && core_1.Getter) === "function" ? _b : Object, typeof (_c = typeof core_1.Getter !== "undefined" && core_1.Getter) === "function" ? _c : Object])
], MemberRepository);
exports.MemberRepository = MemberRepository;
//# sourceMappingURL=member.repository.js.map