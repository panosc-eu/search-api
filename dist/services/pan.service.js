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
const core_1 = require("@loopback/core");
exports.PAN_SERVICE = 'PanService';
/**
 * A binding template for recommender service extensions
 */
function pan(protocol) {
    const asPanService = binding => {
        core_1.extensionFor(exports.PAN_SERVICE)(binding);
        binding.tag({ protocol }).inScope(core_1.BindingScope.SINGLETON);
    };
    return asPanService;
}
exports.pan = pan;
const panFilter = binding => {
    var _a;
    const protocol = (_a = process.env.PAN_PROTOCOL, (_a !== null && _a !== void 0 ? _a : 'scicat'));
    return (core_1.extensionFilter(exports.PAN_SERVICE)(binding) &&
        binding.tagMap.protocol === protocol);
};
let PanServiceProvider = class PanServiceProvider {
    constructor(
    // scicat must match the name property in the datasource json file
    panServices) {
        this.panServices = panServices;
    }
    value() {
        return this.panServices[0];
    }
};
PanServiceProvider = __decorate([
    __param(0, core_1.inject(panFilter)),
    __metadata("design:paramtypes", [Array])
], PanServiceProvider);
exports.PanServiceProvider = PanServiceProvider;
//# sourceMappingURL=pan.service.js.map