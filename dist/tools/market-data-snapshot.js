"use strict";
/**
 * This App will print real time market data of a given contract id.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_next_1 = require("../api-next");
const ib_api_next_app_1 = require("./common/ib-api-next-app");
/////////////////////////////////////////////////////////////////////////////////
// The help text                                                               //
/////////////////////////////////////////////////////////////////////////////////
const DESCRIPTION_TEXT = "Print snapshot of real time market data of a given contract id.";
const USAGE_TEXT = "Usage: market-data-snapshot.js <options>";
const OPTION_ARGUMENTS = [
    ...ib_api_next_app_1.IBApiNextApp.DEFAULT_CONTRACT_OPTIONS,
    // Snapshot market data subscription is not applicable to generic ticks (Error #321)
    // ["ticks=<ticks>", "Comma separated list of generic ticks to fetch."],
];
const EXAMPLE_TEXT = "market-data-snapshot.js -symbol=AAPL -conid=265598 -sectype=STK -exchange=SMART";
//////////////////////////////////////////////////////////////////////////////
// The App code                                                             //
//////////////////////////////////////////////////////////////////////////////
class PrintMarketDataSingleApp extends ib_api_next_app_1.IBApiNextApp {
    constructor() {
        super(DESCRIPTION_TEXT, USAGE_TEXT, OPTION_ARGUMENTS, EXAMPLE_TEXT);
    }
    /**
     * Start the app.
     */
    start() {
        super.start();
        if (!this.api) {
            throw Error("API not initialized");
        }
        this.api
            .getMarketDataSnapshot(this.getContractArg(), "", false)
            .then((marketData) => {
            const dataWithTickNames = new Map();
            marketData.forEach((tick, type) => {
                const value = (0, ib_api_next_app_1.getMarketDataTickDisplayValue)(tick);
                if (value === undefined) {
                    return;
                }
                if (type > api_next_1.IBApiNextTickType.API_NEXT_FIRST_TICK_ID) {
                    dataWithTickNames.set(api_next_1.IBApiNextTickType[type], value);
                }
                else {
                    dataWithTickNames.set(api_next_1.IBApiTickType[type], value);
                }
            });
            this.printObject(dataWithTickNames);
            if (!this.cmdLineArgs.watch)
                this.stop();
        })
            .catch((err) => {
            this.error(`getMarketDataSingle failed with '${err.error.message}'`);
        });
    }
    /**
     * Stop the app with success code.
     */
    stop() {
        this.subscription$?.unsubscribe();
        this.exit();
    }
}
// run the app
new PrintMarketDataSingleApp().start();
//# sourceMappingURL=market-data-snapshot.js.map