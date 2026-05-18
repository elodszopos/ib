export declare class CommandBuffer {
    private readonly cb;
    private readonly cbCtx;
    private commands;
    private commandsCurrent;
    private paused;
    private processing;
    constructor(onCommandCallback: (type: unknown, data: unknown) => void, onCommandCallbackContext: unknown);
    private concatCurrentCommands;
    private process;
    pause(): void;
    resume(): void;
    run(type: unknown, data?: unknown): void;
    schedule(type: unknown, data?: unknown): void;
}
