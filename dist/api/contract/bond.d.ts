import SecType from "../data/enum/sec-type";
import { Contract } from "./contract";
/**
 * A Bond Contract
 */
export declare class Bond implements Contract {
    symbol: string;
    maturity?: string | undefined;
    exchange?: string | undefined;
    currency?: string | undefined;
    constructor(symbol: string, maturity?: string | undefined, exchange?: string | undefined, currency?: string | undefined);
    secType: SecType;
    get lastTradeDateOrContractMonth(): string | undefined;
}
export default Bond;
