import {
  /* inject, */
  bind,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/context';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@bind({tags: {key: AddScoreInterceptor.BINDING_KEY}})
export class AddScoreInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${AddScoreInterceptor.name}`;

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
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      const result = await next();
      // Add post-invocation logic here
      if (Array.isArray(result)) {
        return result.map((item) => ({...item, score: 0}));
      } else {
        return result;
      }
    } catch (err) {
      // Add error handling logic here
      console.error(err);
    }
  }
}
