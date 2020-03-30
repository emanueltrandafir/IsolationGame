import { AbstractItem, ItemType } from "./item_abstract.js";

export class TunaCan extends AbstractItem {

    constructor(id, x , y){
        super(id, ItemType.TUNA_CAN, "30px", x, y);
    }

}