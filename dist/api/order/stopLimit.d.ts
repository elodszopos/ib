import OrderAction from "./enum/order-action";
import { OrderType } from "./enum/orderType";
import { TimeInForce } from "./enum/tif";
/**
 * Represents a stop-limit order.
 */
export declare class StopLimitOrder {
    action: OrderAction;
    lmtPrice: number;
    auxPrice: number;
    totalQuantity?: number | undefined;
    transmit?: boolean | undefined;
    parentId?: number | undefined;
    tif?: TimeInForce | undefined;
    constructor(action: OrderAction, lmtPrice: number, auxPrice: number, totalQuantity?: number | undefined, transmit?: boolean | undefined, parentId?: number | undefined, tif?: TimeInForce | undefined);
    orderType: OrderType;
}
export default StopLimitOrder;
