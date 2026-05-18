// Internalized from `command-buffer@0.1.0` (npm: pilwon/command-buffer, MIT)
// Simple pausable command queue -- schedule/run callbacks, pause/resume processing

export class CommandBuffer {
  private readonly cb: (type: unknown, data: unknown) => void;
  private readonly cbCtx: unknown;
  private commands: Array<{ type: unknown; data: unknown }> = [];
  private commandsCurrent: Array<{ type: unknown; data: unknown }> = [];
  private paused = false;
  private processing = false;

  constructor(
    onCommandCallback: (type: unknown, data: unknown) => void,
    onCommandCallbackContext: unknown,
  ) {
    this.cb = onCommandCallback;
    this.cbCtx = onCommandCallbackContext;
  }

  private concatCurrentCommands(): void {
    this.commands = this.commandsCurrent.concat(this.commands);
    this.commandsCurrent.length = 0;
  }

  private process(): void {
    while (!this.paused) {
      this.processing = true;

      if (!this.commands.length) {
        this.concatCurrentCommands();
      }

      const command = this.commands.shift();
      if (!command) break;

      this.cb.call(this.cbCtx, command.type, command.data);
      this.concatCurrentCommands();
    }

    this.processing = false;
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
    this.concatCurrentCommands();
    if (!this.processing) {
      this.process();
    }
  }

  run(type: unknown, data?: unknown): void {
    this.commandsCurrent.push({ type, data });
    if (!this.processing) {
      this.process();
    }
  }

  schedule(type: unknown, data?: unknown): void {
    this.commands.push({ type, data });
    if (!this.processing) {
      this.process();
    }
  }
}
