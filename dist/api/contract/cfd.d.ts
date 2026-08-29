import SecType from "../data/enum/sec-type";
import { Contract } from "./contract";
/**
 * A CFD contract.
 */
export declare class CFD implements Contract {
    symbol: string;
    currency?: string | undefined;
    exchange?: string | undefined;
    constructor(symbol: string, currency?: string | undefined, exchange?: string | undefined);
    secType: SecType;
}
export default CFD;
