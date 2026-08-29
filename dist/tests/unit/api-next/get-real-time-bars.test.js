"use strict";
/**
 * This file implements tests for the [[IBApiNext.getRealTimeBars]] function.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const what_to_show_1 = require("../../../api/historical/what-to-show");
describe("RxJS Wrapper: getRealTimeBars()", () => {
    test("requests fixed five second bars and cancels on unsubscribe", () => {
        const apiNext = new __1.IBApiNext();
        const api = apiNext.api;
        const contract = { conId: 12345 };
        const reqRealTimeBars = jest
            .spyOn(api, "reqRealTimeBars")
            .mockReturnValue(api);
        const cancelRealTimeBars = jest
            .spyOn(api, "cancelRealTimeBars")
            .mockReturnValue(api);
        jest.spyOn(api, "isConnected", "get").mockReturnValue(true);
        const subscription = apiNext.getRealTimeBars(contract).subscribe({
            error: (err) => {
                fail(err.error.message);
            },
        });
        api.emit(__1.EventName.connected);
        expect(reqRealTimeBars).toHaveBeenCalledWith(expect.any(Number), contract, 5, what_to_show_1.WhatToShow.TRADES, false);
        subscription.unsubscribe();
        expect(cancelRealTimeBars).toHaveBeenCalledWith(reqRealTimeBars.mock.calls[0][0]);
    });
    test("emits realtimeBar events as bars", (done) => {
        const apiNext = new __1.IBApiNext();
        const api = apiNext.api;
        const refBar = {
            time: "1718995200",
            open: 1,
            high: 2,
            low: 3,
            close: 4,
            volume: 5,
            WAP: 6,
            count: 7,
        };
        const subscription = apiNext
            .getRealTimeBars({ conId: 12345 }, what_to_show_1.WhatToShow.BID, true)
            .subscribe({
            next: (bar) => {
                expect(bar).toEqual(refBar);
                subscription.unsubscribe();
                done();
            },
            error: (err) => {
                fail(err.error.message);
            },
        });
        api.emit(__1.EventName.realtimeBar, 1, Number(refBar.time), refBar.open, refBar.high, refBar.low, refBar.close, refBar.volume, refBar.WAP, refBar.count);
    });
    test("omits unavailable realtimeBar fields", (done) => {
        const apiNext = new __1.IBApiNext();
        const api = apiNext.api;
        const subscription = apiNext.getRealTimeBars({ conId: 12345 }).subscribe({
            next: (bar) => {
                expect(bar).toEqual({
                    time: "1718995200",
                    open: 1,
                    high: 2,
                    low: 3,
                    close: 4,
                });
                subscription.unsubscribe();
                done();
            },
            error: (err) => {
                fail(err.error.message);
            },
        });
        api.emit(__1.EventName.realtimeBar, 1, 1718995200, 1, 2, 3, 4, -1, -1, -1);
    });
});
//# sourceMappingURL=get-real-time-bars.test.js.map