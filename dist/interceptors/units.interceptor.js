"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
let UnitsInterceptor = class UnitsInterceptor {
    /*
    constructor() {}
    */
    /**
     * This method is used by LoopBack context to produce an interceptor function
     * for the binding.
     *
     * @returns An interceptor function
     */
    value() {
        return this.intercept.bind(this);
    }
    /**
     * The logic to intercept an invocation
     * @param invocationCtx - Invocation context
     * @param next - A function to invoke next interceptor or the target method
     */
    async intercept(invocationCtx, next) {
        console.log('convertName:before-' + invocationCtx.methodName);
        // eslint-disable-next-line no-useless-catch
        try {
            // Add pre-invocation logic here
            const result = await next();
            // Add post-invocation logic here
            const a = 1;
            console.log('test', a);
            return result;
        }
        catch (err) {
            // Add error handling logic here
            throw err;
        }
    }
};
UnitsInterceptor = __decorate([
    context_1.bind({ tags: { namespace: 'interceptors', name: 'units' } })
], UnitsInterceptor);
exports.UnitsInterceptor = UnitsInterceptor;
//# sourceMappingURL=units.interceptor.js.map