import OptionType from "../data/enum/option-type";
import SecType from "../data/enum/sec-type";
import { Contract } from "./contract";
/**
 * A Future Option Contract
 */
export declare class FOP implements Contract {
    symbol: string;
    expiry: string;
    strike: number;
    right: OptionType;
    multiplier?: number | undefined;
    exchange?: string | undefined;
    currency?: string | undefined;
    constructor(symbol: string, expiry: string, strike: number, right: OptionType, multiplier?: number | undefined, exchange?: string | undefined, currency?: string | undefined);
    secType: SecType;
}
export default FOP;
