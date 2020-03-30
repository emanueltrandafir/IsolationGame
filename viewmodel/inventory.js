

export class Inventory {

    id = "inv";
    SIZE = 5;
    items = [];
    htmlElement = {};

    constructor(id,size) {
        if( size != undefined ){
            this.size = size;
        }
        this.id = id;
        this.htmlElement = document.getElementById(id);
        this.updateView()
    }

    addItem( item ){
        if( this.items.length == this.SIZE ){
            throw "inventory exception: inventory is full";
        }
        this.items.push(item);
        this.updateView()
    }

    removeItem( item ){
        for(let i=0; i<this.items.length; i++){
            if(this.items[i] == item){
                this.items.splice(i,1);
                this.updateView()
                return;
            }
        }
        throw "inventory exception: item not found";
    }

    updateView(){
        while (this.htmlElement.firstChild) {
            this.htmlElement.firstChild.remove();
        }
        for(let item of this.items){
            this.htmlElement.appendChild(item.inventoryHtmlElement);
        }
    }

}