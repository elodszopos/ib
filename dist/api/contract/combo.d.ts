import SecType from "../data/enum/sec-type";
import ComboLeg from "./comboLeg";
import { Contract } from "./contract";
/**
 * A Combo contract.
 */
export declare class Combo implements Contract {
    symbol: string;
    comboLegs: ComboLeg[];
    currency?: string | undefined;
    exchange?: string | undefined;
    constructor(symbol: string, comboLegs: ComboLeg[], currency?: string | undefined, exchange?: string | undefined);
    secType: SecType;
}
export default Combo;
