import SecType from "../data/enum/sec-type";
import { Contract } from "./contract";
/**
 * Stock contract.
 */
export declare class Stock implements Contract {
    symbol: string;
    exchange?: string | undefined;
    currency?: string | undefined;
    constructor(symbol: string, exchange?: string | undefined, currency?: string | undefined);
    secType: SecType;
}
export default Stock;
