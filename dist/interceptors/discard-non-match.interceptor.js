"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DiscardNonMatchInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
let DiscardNonMatchInterceptor = DiscardNonMatchInterceptor_1 = class DiscardNonMatchInterceptor {
    // constructor(@inject(RestBindings.Http.REQUEST) private request: Request) {}
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
        try {
            // Add pre-invocation logic here
            const result = await next();
            // Add post-invocation logic here
            console.log('>>>> args', invocationCtx.args[0]);
            // const filter = invocationCtx.args[0];
            console.log('>>>>> result', JSON.stringify(result));
            if (Array.isArray(result)) {
                // const modifiedResult = result.map((document) => {});
                // console.log('>>>> members', doc.members);
                return result;
            }
            else {
                return result;
            }
        }
        catch (err) {
            // Add error handling logic here
            console.error(err);
        }
    }
};
DiscardNonMatchInterceptor.BINDING_KEY = `interceptors.${DiscardNonMatchInterceptor_1.name}`;
DiscardNonMatchInterceptor = DiscardNonMatchInterceptor_1 = __decorate([
    context_1.bind({ tags: { key: DiscardNonMatchInterceptor_1.BINDING_KEY } })
], DiscardNonMatchInterceptor);
exports.DiscardNonMatchInterceptor = DiscardNonMatchInterceptor;
//# sourceMappingURL=discard-non-match.interceptor.js.map