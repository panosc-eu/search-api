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
const document_model_1 = require("./document.model");
const person_model_1 = require("./person.model");
const affiliation_model_1 = require("./affiliation.model");
let Member = class Member extends repository_1.Entity {
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
], Member.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], Member.prototype, "role", void 0);
__decorate([
    repository_1.belongsTo(() => document_model_1.Document),
    __metadata("design:type", String)
], Member.prototype, "documentId", void 0);
__decorate([
    repository_1.belongsTo(() => person_model_1.Person),
    __metadata("design:type", String)
], Member.prototype, "personId", void 0);
__decorate([
    repository_1.belongsTo(() => affiliation_model_1.Affiliation),
    __metadata("design:type", Number)
], Member.prototype, "affiliationId", void 0);
Member = __decorate([
    repository_1.model({ settings: { strict: false } }),
    __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], Member);
exports.Member = Member;
//# sourceMappingURL=member.model.js.map