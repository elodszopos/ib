export declare function rateLimit<A extends unknown[]>(limitCount: number, limitInterval: number, fn: (...args: A) => void): (...args: A) => void;
