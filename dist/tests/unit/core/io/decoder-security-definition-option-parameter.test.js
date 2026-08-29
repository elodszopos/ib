"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_name_1 = require("../../../../api/data/enum/event-name");
const min_server_version_1 = __importDefault(require("../../../../api/data/enum/min-server-version"));
const decoder_1 = require("../../../../core/io/decoder");
const in_msg_id_1 = require("../../../../core/io/enum/in-msg-id");
describe("Decoder securityDefinitionOptionParameter", () => {
    test("preserves zero-valued strikes", () => {
        const emitEvent = jest.fn();
        const decoder = new decoder_1.Decoder({
            serverVersion: min_server_version_1.default.SEC_DEF_OPT_PARAMS_REQ,
            emitEvent,
            emitError: jest.fn(),
            emitInfo: jest.fn(),
        });
        decoder.enqueueMessage([
            String(in_msg_id_1.IN_MSG_ID.SECURITY_DEFINITION_OPTION_PARAMETER),
            "42",
            "SMART",
            "12345",
            "SPX",
            "100",
            "1",
            "20260717",
            "2",
            "0",
            "12.5",
        ]);
        decoder.process();
        expect(emitEvent).toHaveBeenCalledWith(event_name_1.EventName.securityDefinitionOptionParameter, 42, "SMART", 12345, "SPX", 100, ["20260717"], [0, 12.5]);
    });
});
//# sourceMappingURL=decoder-security-definition-option-parameter.test.js.map