"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aapl_contract = exports.sample_option = exports.sample_future = exports.sample_crypto = exports.sample_dax_index = exports.sample_index = exports.sample_bond = exports.sample_etf = exports.sample_stock = void 0;
/**
 * This file describe sample contracts to be used in various tests code.
 */
const __1 = require("../../..");
exports.sample_stock = new __1.Stock("AAPL");
exports.sample_etf = new __1.Stock("SPY");
exports.sample_bond = new __1.Bond("US064159KJ44");
exports.sample_index = new __1.Index("ES");
exports.sample_dax_index = new __1.Index("DAX", "EUREX", "EUR");
exports.sample_crypto = new __1.Crypto("BTC");
// This one will need to be updated sometimes
exports.sample_future = new __1.Future("ES", "ESZ6", "202612", "CME", 50);
// This one may need to be updated from times to times
exports.sample_option = new __1.Option("SPY", "20281215", 750, __1.OptionType.Call);
/*
   Contracts with conId for tests needing IB's conID
*/
exports.aapl_contract = {
    conId: 265598,
    secType: __1.SecType.STK,
    symbol: "AAPL",
    exchange: "SMART",
    currency: "USD",
};
//# sourceMappingURL=contracts.js.map