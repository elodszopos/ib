"use strict";
// Internalized from `function-rate-limit@1.1.0` (MIT)
// Token-bucket rate limiter: allows `limitCount` calls per `limitInterval` ms, queues excess
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimit = rateLimit;
function rateLimit(limitCount, limitInterval, fn) {
    const fifo = [];
    let count = limitCount;
    function callNext(immediate) {
        setTimeout(() => {
            if (fifo.length > 0) {
                callNext();
            }
            else {
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
    return function rateLimitedFunction(...args) {
        if (count <= 0) {
            fifo.push([this, args]);
            return;
        }
        count = count - 1;
        callNext([this, args]);
    };
}
//# sourceMappingURL=rate-limit.js.map