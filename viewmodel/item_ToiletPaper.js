import { AbstractItem, ItemType } from "./item_abstract.js";
import { DataTypesUtil } from "../utils/dataTypes.js";


export class ToiletPaper extends AbstractItem {

    constructor(id, x , y){
        super(id, ItemType.TOILET_PAPER, "40px", x, y);
    }

}