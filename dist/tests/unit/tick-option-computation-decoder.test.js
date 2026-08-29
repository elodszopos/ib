"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_name_1 = require("../../api/data/enum/event-name");
const min_server_version_1 = __importDefault(require("../../api/data/enum/min-server-version"));
const tickType_1 = __importDefault(require("../../api/market/tickType"));
const decoder_1 = require("../../core/io/decoder");
const in_msg_id_1 = require("../../core/io/enum/in-msg-id");
describe("Decoder tickOptionComputation", () => {
    test("emits tickAttrib before option computation values", () => {
        const emitEvent = jest.fn();
        const decoder = new decoder_1.Decoder({
            serverVersion: min_server_version_1.default.PRICE_BASED_VOLATILITY,
            emitEvent,
            emitError: jest.fn(),
            emitInfo: jest.fn(),
        });
        decoder.enqueueMessage([
            String(in_msg_id_1.IN_MSG_ID.TICK_OPTION_COMPUTATION),
            "1",
            String(tickType_1.default.BID_OPTION),
            "1",
            "0.25",
            "0.5",
            "1.5",
            "0.75",
            "0.1",
            "0.2",
            "0.3",
            "100",
        ]);
        decoder.process();
        expect(emitEvent).toHaveBeenCalledWith(event_name_1.EventName.tickOptionComputation, 1, tickType_1.default.BID_OPTION, 1, 0.25, 0.5, 1.5, 0.75, 0.1, 0.2, 0.3, 100);
    });
});
//# sourceMappingURL=tick-option-computation-decoder.test.js.map