import { AbstractItem, ItemType } from "./item_abstract.js";

export class VitaminC extends AbstractItem {

    static SPEED_BOOST = 3;

    constructor(id, x , y){
        super(id, ItemType.VITAMIN_C, "42px", x, y);
    }

}