"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bold = exports.red = exports.yellow = exports.green = exports.grey = void 0;
const wrap = (open, close) => (value) => `${open}${String(value)}${close}`;
exports.grey = wrap("\x1b[90m", "\x1b[39m");
exports.green = wrap("\x1b[32m", "\x1b[39m");
exports.yellow = wrap("\x1b[33m", "\x1b[39m");
exports.red = wrap("\x1b[31m", "\x1b[39m");
exports.bold = wrap("\x1b[1m", "\x1b[22m");
//# sourceMappingURL=ansi-colors.js.map