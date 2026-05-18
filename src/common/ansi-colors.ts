// Minimal ANSI color utilities -- replaces the `colors` npm package (supply chain risk: v1.4.1+ sabotaged)
// Only the 4 styles used by this library: grey, green, yellow, bold+red

const RESET = "\x1b[0m";
const GREY = "\x1b[90m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BOLD_RED = "\x1b[1;31m";
const BOLD_YELLOW = "\x1b[1;33m";

const wrap = (code: string) => (text: string) => `${code}${text}${RESET}`;

export const grey = wrap(GREY);
export const green = wrap(GREEN);
export const yellow = wrap(YELLOW);

export const bold = {
  red: wrap(BOLD_RED),
  yellow: wrap(BOLD_YELLOW),
};
