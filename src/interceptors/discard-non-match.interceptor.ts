import {
  /* inject, */
  bind,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/context';
import {Document} from '../models';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@bind({tags: {key: DiscardNonMatchInterceptor.BINDING_KEY}})
export class DiscardNonMatchInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${DiscardNonMatchInterceptor.name}`;

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
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      const result: Document[] = await next();
      // Add post-invocation logic here
      console.log('>>>> args', invocationCtx.args[0]);
      // const filter = invocationCtx.args[0];
      console.log('>>>>> result', JSON.stringify(result));
      if (Array.isArray(result)) {
        // const modifiedResult = result.map((document) => {});
        // console.log('>>>> members', doc.members);

        return result;
      } else {
        return result;
      }
    } catch (err) {
      // Add error handling logic here
      console.error(err);
    }
  }
}
