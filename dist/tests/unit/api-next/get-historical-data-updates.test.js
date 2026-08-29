"use strict";
/**
 * This file implements tests for the [[IBApiNext.getHistoricalDataUpdates]] function.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const bar_size_setting_1 = require("../../../api/historical/bar-size-setting");
describe("RxJS Wrapper: getHistoricalDataUpdates()", () => {
    test.each([
        [bar_size_setting_1.BarSizeSetting.SECONDS_FIVE, "60 S"],
        [bar_size_setting_1.BarSizeSetting.MINUTES_ONE, "60 S"],
        [bar_size_setting_1.BarSizeSetting.MINUTES_TWO, "120 S"],
        [bar_size_setting_1.BarSizeSetting.MINUTES_FIFTEEN, "1800 S"],
        [bar_size_setting_1.BarSizeSetting.HOURS_ONE, "3600 S"],
        [bar_size_setting_1.BarSizeSetting.HOURS_TWO, "14400 S"],
        [bar_size_setting_1.BarSizeSetting.HOURS_EIGHT, "28800 S"],
        [bar_size_setting_1.BarSizeSetting.DAYS_ONE, "1 D"],
    ])("uses a compatible seed duration for %s bars", (barSizeSetting, expectedDuration) => {
        const apiNext = new __1.IBApiNext();
        const api = apiNext
            .api;
        const reqHistoricalData = jest
            .spyOn(api, "reqHistoricalData")
            .mockReturnValue(api);
        const subscription = apiNext
            .getHistoricalDataUpdates({}, barSizeSetting, __1.WhatToShow.TRADES, 1)
            .subscribe({
            error: (err) => {
                fail(err.error.message);
            },
        });
        api.emit(__1.EventName.connected);
        expect(reqHistoricalData).toHaveBeenCalledWith(expect.any(Number), {}, "", expectedDuration, barSizeSetting, __1.WhatToShow.TRADES, 0, 1, true);
        subscription.unsubscribe();
        apiNext.disconnect();
    });
    test("Observable updates", (done) => {
        // create IBApiNext
        const apiNext = new __1.IBApiNext();
        const api = apiNext.api;
        // emit EventName.historicalData events and verify RxJS result
        const REF_BARS = [
            {
                time: "20210203 01:02:03",
                open: 1,
                high: 2,
                low: 3,
                close: 4,
                volume: 5,
                count: 6,
                WAP: 7,
            },
            {
                time: "20210203 02:02:03",
                open: 11,
                high: 12,
                low: 13,
                close: 14,
                volume: 15,
                count: 16,
                WAP: 17,
            },
            {
                time: "20210203 03:02:03",
                open: 21,
                high: 22,
                low: 23,
                close: 24,
                volume: 25,
                count: 26,
                WAP: 27,
            },
        ];
        let updateCount = 0;
        apiNext
            .getHistoricalDataUpdates({}, "", __1.WhatToShow.None, 0)
            // eslint-disable-next-line rxjs/no-ignored-subscription
            .subscribe({
            next: (update) => {
                expect(update.time).toEqual(REF_BARS[updateCount].time);
                expect(update.open).toEqual(REF_BARS[updateCount].open);
                expect(update.high).toEqual(REF_BARS[updateCount].high);
                expect(update.low).toEqual(REF_BARS[updateCount].low);
                expect(update.close).toEqual(REF_BARS[updateCount].close);
                expect(update.volume).toEqual(REF_BARS[updateCount].volume);
                expect(update.count).toEqual(REF_BARS[updateCount].count);
                expect(update.WAP).toEqual(REF_BARS[updateCount].WAP);
                updateCount++;
                if (updateCount >= REF_BARS.length) {
                    done();
                }
            },
            error: (err) => {
                fail(err.error.message);
            },
        });
        for (let i = 0; i < REF_BARS.length; i++) {
            api.emit(__1.EventName.historicalDataUpdate, 1, REF_BARS[i].time, REF_BARS[i].open, REF_BARS[i].high, REF_BARS[i].low, REF_BARS[i].close, REF_BARS[i].volume, REF_BARS[i].count, REF_BARS[i].WAP);
        }
    });
});
//# sourceMappingURL=get-historical-data-updates.test.js.map