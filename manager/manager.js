import { Person, PersonBuilder } from '../viewmodel/person.js';
import { ItemType } from '../viewmodel/item_abstract.js';
import { DataTypesUtil } from "../utils/dataTypes.js"
import { ToiletPaper } from '../viewmodel/item_ToiletPaper.js';
import { VitaminC } from '../viewmodel/item_VitaminC.js';
import { TunaCan } from '../viewmodel/item_TunaCan.js';
import { LiquidSoap } from '../viewmodel/item_LiquidSoap.js';
import { DesinfectantSpray } from '../viewmodel/item_DesinfectantSpray.js';

export default class GameManager {

    players = [];
    person1 = {};
    person2 = {}; 

    static MAP = {
        width: 1200,
        height: 605
    }

    constructor( players ){
        this.players = players;
        this.initStage();
    }; 

    mapItems = [];

    initStage(){
 
        this.addItemsToMap();

        let personBuilder = new PersonBuilder(); 
            
        this.person1 = personBuilder
            .withId("player-1")
            .withY(33)
            .withX(33)
            .withDirection("left")
            .withSpeed(5)
            .build();

        if(this.players.length == 1){ return; } 
        this.person2 = personBuilder
            .withId("player-2")
            .withY(33)
            .withX(36)
            .withDirection("right")
            .build();
    }

    addItemsToMap(){
        let paper = new ToiletPaper("p1", 50, 50);
        let tuna = new TunaCan("t1", 40, 40);
        let soap = new LiquidSoap("s1", 30, 50);
        let spray = new DesinfectantSpray("s1", 10, 30);
        let tuna2 = new TunaCan("t1", 30, 80);
        let soap2 = new LiquidSoap("s1", 60, 30);
        let spray2 = new DesinfectantSpray("s1", 40, 30);
        let c = new VitaminC("s1", 20, 20);

        this.mapItems.push(c);
        this.displayOnMap(c);

        this.mapItems.push(spray);
        this.displayOnMap(spray);

        this.mapItems.push(soap);
        this.displayOnMap(soap);

        this.mapItems.push(spray2);
        this.displayOnMap(spray2);

        this.mapItems.push(soap2);
        this.displayOnMap(soap2);

        this.mapItems.push(paper);
        this.displayOnMap(paper);

        this.mapItems.push(tuna);
        this.displayOnMap(tuna);
        this.mapItems.push(tuna2);
        this.displayOnMap(tuna2);
    }
    
    onPersonMove( personStr , direction ){
        DataTypesUtil.assertArrayContains( ["top","right","bottom","left"] , direction );
        DataTypesUtil.assertArrayContains( ["p1","p2"] , personStr );
        let pers = personStr == "p1" ? this.person1 : this.person2;

        if(pers.isMoving){ return; } 
        pers.setDirection( direction );  

        pers.setIsMoving(true);
    };
    
    onPersonStop(personStr){
        DataTypesUtil.assertArrayContains( ["p1","p2"] , personStr );
        let pers = personStr == "p1" ? this.person1 : this.person2;
        
        if( !pers.isMoving ){ return; }
        pers.setIsMoving(false);
    }; 
    
    onPersonAction(personStr){
        DataTypesUtil.assertArrayContains( ["p1","p2"] , personStr );
        let pers = personStr == "p1" ? this.person1 : this.person2;  
        let success = this.tryGrabbing(pers);
        if(success){
            pers.inventory.updateView();
        }
    }
    
    onPersonDrop(personStr){
        DataTypesUtil.assertArrayContains( ["p1","p2"] , personStr );
        let pers = personStr == "p1" ? this.person1 : this.person2;  
        let success = this.tryDropping(pers);
        if(!success){
            //do somethng if needed
        }
    }

    tryGrabbing(pers){
        for(let i=0; i<this.mapItems.length; i++){
            let item = this.mapItems[i];
            if(pers.getReachableArea().containsPoint(item.getPosition())){
                let success = pers.getItem(item);
                if(!success){ continue; }

                this.removeFromMap(item); 
                this.mapItems.splice(i,1);
                return true;
            }
        }
        return false;
    }

    tryDropping(pers){
        let item = pers.inventory.items[0]; //TODO: choose the selected item instead!
        let success = pers.removeFromInventory(item);
        if(!success) { return; } 

        if(item != undefined){
            item.setX(pers.x + 3);
            item.setY(pers.y - 3);
            this.displayOnMap(item);
            this.mapItems.push(item);
        }
    }
    
    displayOnMap(item){
        document.getElementById("map").appendChild(item.htmlElement);
    }
    
    removeFromMap(item){
        document.getElementById("map").removeChild(item.htmlElement);
    }
    
 

    
}