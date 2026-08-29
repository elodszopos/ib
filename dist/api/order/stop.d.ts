import OrderAction from "./enum/order-action";
import { OrderType } from "./enum/orderType";
import { TimeInForce } from "./enum/tif";
/**
 * Represents a stop order.
 */
export declare class StopOrder {
    action: OrderAction;
    auxPrice: number;
    totalQuantity: number;
    transmit?: boolean | undefined;
    parentId?: number | undefined;
    tif?: TimeInForce | undefined;
    constructor(action: OrderAction, auxPrice: number, totalQuantity: number, transmit?: boolean | undefined, parentId?: number | undefined, tif?: TimeInForce | undefined);
    orderType: OrderType;
}
export default StopOrder;
