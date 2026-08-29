"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../..");
const min_server_version_1 = __importDefault(require("../../../../api/data/enum/min-server-version"));
const encoder_1 = require("../../../../core/io/encoder");
describe("Encoder placeOrder", () => {
    test("encodes attached child order quantity independently from parent id", () => {
        let sentTokens = [];
        const callbacks = {
            serverVersion: min_server_version_1.default.CME_TAGGING_FIELDS,
            sendMsg: (...tokens) => {
                sentTokens = tokens.flat(Infinity);
            },
            emitError: (message) => {
                throw new Error(message);
            },
        };
        const encoder = new encoder_1.Encoder(callbacks);
        const contract = {
            symbol: "SPY",
            secType: __1.SecType.STK,
            exchange: "SMART",
            currency: "USD",
        };
        const childOrder = {
            action: __1.OrderAction.SELL,
            totalQuantity: 1,
            orderType: __1.OrderType.LMT,
            lmtPrice: 101.25,
            tif: "GTC",
            account: "DU123",
            transmit: true,
            parentId: 1000,
        };
        encoder.placeOrder(1001, contract, childOrder);
        const actionIndex = sentTokens.indexOf(__1.OrderAction.SELL);
        expect(actionIndex).toBeGreaterThan(-1);
        expect(sentTokens[actionIndex + 1]).toBe(1);
        expect(sentTokens[actionIndex + 2]).toBe(__1.OrderType.LMT);
        expect(sentTokens[actionIndex + 11]).toBe(true);
        expect(sentTokens[actionIndex + 12]).toBe(1000);
    });
});
//# sourceMappingURL=encoder-place-order.test.js.map