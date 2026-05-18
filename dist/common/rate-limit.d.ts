export declare function rateLimit<T extends (...args: unknown[]) => void>(limitCount: number, limitInterval: number, fn: T): T;
