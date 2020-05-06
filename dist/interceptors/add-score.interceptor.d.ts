import { Interceptor, InvocationContext, InvocationResult, Provider, ValueOrPromise } from '@loopback/context';
/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
export declare class AddScoreInterceptor implements Provider<Interceptor> {
    static readonly BINDING_KEY: string;
    /**
     * This method is used by LoopBack context to produce an interceptor function
     * for the binding.
     *
     * @returns An interceptor function
     */
    value(): any;
    /**
     * The logic to intercept an invocation
     * @param invocationCtx - Invocation context
     * @param next - A function to invoke next interceptor or the target method
     */
    intercept(invocationCtx: InvocationContext, next: () => ValueOrPromise<InvocationResult>): unknown;
}
