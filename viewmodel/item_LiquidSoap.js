
import { AbstractItem, ItemType } from "./item_abstract.js";

export class LiquidSoap extends AbstractItem {

    constructor(id, x , y){
        super(id, ItemType.LIQUID_SOAP, "40px", x, y);
    }

}