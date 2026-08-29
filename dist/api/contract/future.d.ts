import SecType from "../data/enum/sec-type";
import { Contract } from "./contract";
/**
 * A Future Contract
 */
export declare class Future implements Contract {
    symbol: string;
    localSymbol: string;
    lastTradeDateOrContractMonth: string;
    exchange: string;
    multiplier: number;
    currency?: string | undefined;
    constructor(symbol: string, localSymbol: string, lastTradeDateOrContractMonth: string, exchange: string, multiplier: number, currency?: string | undefined);
    secType: SecType;
}
export default Future;
