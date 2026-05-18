// Internalized from `function-rate-limit@1.1.0` (MIT)
// Token-bucket rate limiter: allows `limitCount` calls per `limitInterval` ms, queues excess

export function rateLimit<A extends unknown[]>(
  limitCount: number,
  limitInterval: number,
  fn: (...args: A) => void,
): (...args: A) => void {
  const fifo: Array<[thisArg: unknown, args: A]> = [];
  let count = limitCount;

  function callNext(immediate?: [thisArg: unknown, args: A]): void {
    setTimeout(() => {
      if (fifo.length > 0) {
        callNext();
      } else {
        count = count + 1;
      }
    }, limitInterval);

    const callArgs = fifo.shift();

    if (!callArgs && immediate) {
      fn.apply(immediate[0], immediate[1]);
      return;
    }

    if (callArgs) {
      fn.apply(callArgs[0], callArgs[1]);
    }
  }

  return function rateLimitedFunction(this: unknown, ...args: A) {
    if (count <= 0) {
      fifo.push([this, args]);
      return;
    }
    count = count - 1;
    callNext([this, args]);
  };
}
