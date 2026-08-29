"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ib_api_next_app_1 = require("../../../tools/common/ib-api-next-app");
describe("IBApiNextApp market data formatting", () => {
    test("prefers numeric tick values including zero", () => {
        expect((0, ib_api_next_app_1.getMarketDataTickDisplayValue)({
            value: 0,
            stringValue: "raw",
            ingressTm: 1,
        })).toEqual(0);
    });
    test("falls back to structured tickString values", () => {
        const rtVolume = "184.84;2;1718995200000;100;184.80;true";
        expect((0, ib_api_next_app_1.getMarketDataTickDisplayValue)({
            stringValue: rtVolume,
            ingressTm: 1,
        })).toEqual(rtVolume);
    });
});
//# sourceMappingURL=ib-api-next-app.test.js.map