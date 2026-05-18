// Internalized from `function-rate-limit@1.1.0` (MIT)
// Token-bucket rate limiter: allows `limitCount` calls per `limitInterval` ms, queues excess

export function rateLimit<T extends (...args: unknown[]) => void>(
  limitCount: number,
  limitInterval: number,
  fn: T,
): T {
  const fifo: Array<[thisArg: unknown, args: unknown[]]> = [];
  let count = limitCount;

  function callNext(immediate?: [thisArg: unknown, args: unknown[]]): void {
    setTimeout(() => {
      if (fifo.length > 0) {
        callNext();
      } else {
        count = count + 1;
      }
    }, limitInterval);

    const callArgs = fifo.shift();

    if (!callArgs && immediate) {
      fn.apply(immediate[0], immediate[1] as Parameters<T>);
      return;
    }

    if (callArgs) {
      fn.apply(callArgs[0], callArgs[1] as Parameters<T>);
    }
  }

  return function rateLimitedFunction(this: unknown, ...args: unknown[]) {
    if (count <= 0) {
      fifo.push([this, args]);
      return;
    }
    count = count - 1;
    callNext([this, args]);
  } as T;
}
