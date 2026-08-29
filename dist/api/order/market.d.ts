import OrderAction from "./enum/order-action";
import { OrderType } from "./enum/orderType";
/**
 * Represents a limit order.
 */
export declare class MarketOrder {
    action: OrderAction;
    totalQuantity: number;
    transmit?: boolean | undefined;
    goodAfterTime?: string | undefined;
    goodTillDate?: string | undefined;
    constructor(action: OrderAction, totalQuantity: number, transmit?: boolean | undefined, goodAfterTime?: string | undefined, goodTillDate?: string | undefined);
    orderType: OrderType;
}
export default MarketOrder;
