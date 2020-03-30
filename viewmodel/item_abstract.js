import { Point } from "../utils/navigation.js";
import { DataTypesUtil } from "../utils/dataTypes.js";
 
export const ItemType = {
    DESINFECTANT_SPRAY: 'disinfectant_spray',
    TOILET_PAPER:       'toilet_paper',
    LIQUID_SOAP:        'liquid_soap',
    TUNA_CAN:           'tuna_can',
    VITAMIN_C:          'vitamin_c',
}

export class AbstractItem { 

    id = "item";
    itemType;

    x = 50; // from 0 (left) to 100 (right)
    y = 50; // from 0 (bottom) to 100 (top) 
    
    size = "40px";
    htmlElement = null; 
    inventoryHtmlElement = null;

    constructor(id, itemType, size, x, y) { 
        DataTypesUtil.assertEnumContains(ItemType, itemType);
        this.itemType = itemType;
        this.size = size;
        this.x = x;
        this.y = y; 
        this.id = id;

        this.initViews();
        this.updatePosition(); 
    }

    initViews(){
        let e = document.createElement("img"); 
        e.setAttribute("id", this.id); 
        e.setAttribute("width", this.size); 
        e.setAttribute("heigth", this.size); 
        e.setAttribute("src", "../assets/" + this.itemType + ".png"); 
        e.classList.add( "item" );
        e.classList.add( this.itemType );

        let e2 = document.createElement("img"); 
        e2.setAttribute("id", this.id + "-inventory"); 
        e2.setAttribute("width", this.size); 
        e2.setAttribute("heigth", this.size); 
        e2.setAttribute("src", "../assets/" + this.itemType + ".png"); 
        e2.classList.add( "item-view" );
        e2.classList.add( this.itemType );

        this.htmlElement = e;
        this.inventoryHtmlElement = e2;
    }

    updatePosition(){
        this.htmlElement.style.top = this.convertTop();
        this.htmlElement.style.left = this.convertLeft();
    } 

    getPosition(){
        let adj = 4;
        return new Point( this.x - adj, this.y + adj );
    }

    setX(x){
        this.x = x;
        this.updatePosition();
    }

    setY(y){
        this.y = y;
        this.updatePosition();
    }

    convertTop(y){
        y = (typeof y !== 'undefined') ?  y : this.y;
        if(y < 7 || y > 100 ){ return; };
        return (100-y) + "%"; 
    }
    
    convertLeft(x){
        x = (typeof x !== 'undefined') ?  x : this.x;
        if(x < 0 || x > 93) { return; };
        return x + "%";
    }
    
    
}



 


