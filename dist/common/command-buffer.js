"use strict";
// Internalized from `command-buffer@0.1.0` (npm: pilwon/command-buffer, MIT)
// Simple pausable command queue -- schedule/run callbacks, pause/resume processing
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBuffer = void 0;
class CommandBuffer {
    constructor(onCommandCallback, onCommandCallbackContext) {
        this.commands = [];
        this.commandsCurrent = [];
        this.paused = false;
        this.processing = false;
        this.cb = onCommandCallback;
        this.cbCtx = onCommandCallbackContext;
    }
    concatCurrentCommands() {
        this.commands = this.commandsCurrent.concat(this.commands);
        this.commandsCurrent.length = 0;
    }
    process() {
        while (!this.paused) {
            this.processing = true;
            if (!this.commands.length) {
                this.concatCurrentCommands();
            }
            const command = this.commands.shift();
            if (!command)
                break;
            this.cb.call(this.cbCtx, command.type, command.data);
            this.concatCurrentCommands();
        }
        this.processing = false;
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
        this.concatCurrentCommands();
        if (!this.processing) {
            this.process();
        }
    }
    run(type, data) {
        this.commandsCurrent.push({ type, data });
        if (!this.processing) {
            this.process();
        }
    }
    schedule(type, data) {
        this.commands.push({ type, data });
        if (!this.processing) {
            this.process();
        }
    }
}
exports.CommandBuffer = CommandBuffer;
//# sourceMappingURL=command-buffer.js.map