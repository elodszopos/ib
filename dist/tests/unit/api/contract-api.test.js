"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
describe("contract API exports", () => {
    test("exports Crypto from the package API", () => {
        const contract = new __1.Crypto("BTC");
        expect(contract).toMatchObject({
            symbol: "BTC",
            exchange: "PAXOS",
            currency: "USD",
            secType: __1.SecType.CRYPTO,
        });
    });
    test("uses exchange before currency for Index constructor arguments", () => {
        const contract = new __1.Index("DAX", "EUREX", "EUR");
        expect(contract).toMatchObject({
            symbol: "DAX",
            exchange: "EUREX",
            currency: "EUR",
            secType: __1.SecType.IND,
        });
    });
});
//# sourceMappingURL=contract-api.test.js.map