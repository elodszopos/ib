import SecType from "../data/enum/sec-type";
import { Contract } from "./contract";
/**
 * Index contract.
 */
export declare class Index implements Contract {
    symbol: string;
    exchange?: string | undefined;
    currency?: string | undefined;
    constructor(symbol: string, exchange?: string | undefined, currency?: string | undefined);
    secType: SecType;
}
export default Index;
