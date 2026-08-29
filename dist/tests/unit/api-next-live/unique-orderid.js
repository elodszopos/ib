"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const logger_1 = __importDefault(require("../../../common/logger"));
const _timeoutPromise = async (secs, reason) => new Promise((_, reject) => setTimeout(() => reject(new Error(reason ?? "timeout")), secs * 1_000));
describe("Issue xxx", () => {
    jest.setTimeout(20 * 1_000);
    let clientId = Math.floor(Math.random() * 32766) + 1; // ensure unique client id
    let ib;
    let error$;
    beforeEach(() => {
        ib = new __1.IBApiNext();
        if (!error$) {
            error$ = ib.errorSubject.subscribe((error) => {
                if (error.reqId === -1) {
                    logger_1.default.warn(`${error.error.message} (Error #${error.code})`);
                }
                else {
                    logger_1.default.error(`${error.error.message} (Error #${error.code}) ${error.advancedOrderReject ? error.advancedOrderReject : ""}`);
                }
            });
        }
        try {
            ib.connect(clientId++);
        }
        catch (error) {
            logger_1.default.error(error.message);
        }
    });
    afterEach(() => {
        if (ib) {
            ib.disconnect();
        }
    });
    /*
    WIP
    */
    // test("Bug", async () => {
    //   return new Promise<void>(async (resolve, reject) => {
    //     let refId: number;
    //     const _ordersSubscription$ = ib.getOpenOrders().subscribe({
    //       next: (data) => {
    //         logger.debug(data.all.length);
    //         data.added?.forEach((item) => {
    //           if (item.orderId === refId) {
    //             logger.info(`Order #${refId} found in open orders.`);
    //             resolve();
    //           }
    //         });
    //       },
    //       error: (err: IBApiNextError) => {
    //         logger.error(`getOpenOrders failed with '${err.error.message}'`);
    //         reject(`getOpenOrders failed with '${err.error.message}'`);
    //       },
    //     });
    //     await ib
    //       .placeNewOrder(aapl_contract, sample_order)
    //       .then((orderId: number) => {
    //         logger.info(`Order #${orderId} posted.`);
    //       });
    //     await ib
    //       .placeNewOrder(aapl_contract, sample_order)
    //       .then((orderId: number) => {
    //         logger.info(`Order #${orderId} posted.`);
    //       });
    //     await ib
    //       .placeNewOrder(aapl_contract, sample_order)
    //       .then((orderId: number) => {
    //         logger.info(`Order #${orderId} posted.`);
    //         refId = orderId;
    //       });
    //   });
    // });
});
//# sourceMappingURL=unique-orderid.js.map