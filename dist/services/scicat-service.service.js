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
Object.defineProperty(exports, "__esModule", { value: true });
const service_proxy_1 = require("@loopback/service-proxy");
const core_1 = require("@loopback/core");
const datasources_1 = require("../datasources");
const pan_service_1 = require("./pan.service");
let ScicatServiceProvider = class ScicatServiceProvider {
    constructor(
    // scicat must match the name property in the datasource json file
    dataSource = new datasources_1.ScicatDataSource()) {
        this.dataSource = dataSource;
    }
    value() {
        return service_proxy_1.getService(this.dataSource);
    }
};
ScicatServiceProvider = __decorate([
    core_1.bind(pan_service_1.pan('scicat')),
    __param(0, core_1.inject('datasources.scicat')),
    __metadata("design:paramtypes", [datasources_1.ScicatDataSource])
], ScicatServiceProvider);
exports.ScicatServiceProvider = ScicatServiceProvider;
//# sourceMappingURL=scicat-service.service.js.map