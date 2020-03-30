

import { AbstractItem, ItemType } from "./item_abstract.js";

export class DesinfectantSpray extends AbstractItem {

    constructor(id, x , y){
        super(id, ItemType.DESINFECTANT_SPRAY, "50px", x, y);
    }

}