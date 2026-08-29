export declare class CommandBuffer<TType> {
    private readonly cb;
    private readonly cbCtx;
    private commands;
    private commandsCurrent;
    private paused;
    private processing;
    constructor(onCommandCallback: (type: TType, data: unknown) => void, onCommandCallbackContext: unknown);
    private concatCurrentCommands;
    private process;
    pause(): void;
    resume(): void;
    run(type: TType, data?: unknown): void;
    schedule(type: TType, data?: unknown): void;
}
