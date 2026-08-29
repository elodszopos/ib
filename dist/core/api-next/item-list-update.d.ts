import { ItemListUpdate } from "../../api-next/common/item-list-update";
/**
 * @internal
 *
 * Implementation for the DataUpdate interface.
 */
export declare class IBApiNextItemListUpdate<T> implements ItemListUpdate<T> {
    readonly all: T;
    readonly added?: T | undefined;
    readonly changed?: T | undefined;
    readonly removed?: T | undefined;
    constructor(all: T, added?: T | undefined, changed?: T | undefined, removed?: T | undefined);
}
