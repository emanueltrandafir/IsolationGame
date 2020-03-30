import { Area , Point } from "../utils/navigation.js";
import { DataTypesUtil } from "../utils/dataTypes.js";
import { Inventory } from "./inventory.js";
import { ItemType } from "./item_abstract.js";
import { VitaminC } from "./item_VitaminC.js";


const heading = {
    TOP : "TOP",
    LEFT : "LEFT",
    BOTTOM : "BOTTOM",
    RIGHT : "RIGHT"
}


export class Person { 

    id = "person";
    x = 50; // from 0 (left) to 100 (right)
    y = 50; // from 0 (bottom) to 100 (top)
    speed = 2; // from 1 (slow) to 5 (fast) recommanded
    direction = heading.TOP;
    htmlElement = null;
    isMoving = false;
    movingInterval = null;

    // fixed values
    BASE_SPEED = 25;
    SPEED_LIMIT_MAX = 8;
    SPEED_LIMIT_MIN = 1;
    SPEED_MULTIPLYER = 3;

    // reachable 
    reachableRadius = 12;

    // inventory
    inventory = {};

    constructor(id) { 
        let e = document.createElement("div"); 
        document.getElementById("map").appendChild(e);
        
        e.setAttribute("id", id); 
        e.classList.add( "person" );

        let name = document.createElement("div");
        name.innerText = id;
        name.classList.add( "person-name" );
        e.appendChild(name);

        this.id = id;
        this.htmlElement = e;
        this.updatePosition();
        this.updateAnimation();

        this.inventory = new Inventory("inventory-"+id);
    }

    updatePosition(){
        this.htmlElement.style.top = this.convertTop();
        this.htmlElement.style.left = this.convertLeft();
    } 

    setSpeed(speed){
        if(speed > this.SPEED_LIMIT_MAX){ speed = this.SPEED_LIMIT_MAX };
        if(speed < this.SPEED_LIMIT_MIN){ speed = this.SPEED_LIMIT_MIN };
        this.speed = speed;
    }

    setX(x){
        if(!this.canMove()){ return; }
        this.x = x;
        this.updatePosition();
    }
    
    setY(y){
        if(!this.canMove()){ return; }
        this.y = y;
        this.updatePosition();
    }

    setIsMoving(isMoving){
        this.isMoving = isMoving;
        this.updateAnimation();

        if(isMoving){
            this.startMoving();
        } else {
            this.stopMoving();
        }
    }
    
    setDirection(direction){
        direction = direction.toUpperCase();
        if(heading[direction] == undefined) { return; } 
        this.direction = direction; 
        this.updateAnimation();
    }

    updateAnimation(){
        let lookingClass = "look-" + this.direction.toLowerCase();
        this.removeLookingClasses();
        this.htmlElement.classList.add( lookingClass );
         
        if(this.isMoving){ 
            this.htmlElement.classList.add( "move" );
        } else {
            this.htmlElement.classList.remove( "move" );
        }
    }

    removeLookingClasses(){
        this.htmlElement.classList.remove("look-top");
        this.htmlElement.classList.remove("look-right");
        this.htmlElement.classList.remove("look-left");
        this.htmlElement.classList.remove("look-bottom");
    }

    convertTop(y){
        y = (typeof y !== 'undefined') ?  y : this.y;
        // if(y < 7 || y > 100 ){ return; };
        return (100-y) + "%"; 
    }
    
    convertLeft(x){
        x = (typeof x !== 'undefined') ?  x : this.x;
        // if(x < 0 || x > 93) { return; };
        return x + "%";
    }
    
    convertSpeed(speed){
        speed = (typeof speed !== 'undefined') ?  speed : this.speed;
        if(speed > this.SPEED_LIMIT_MAX){ speed = this.SPEED_LIMIT_MAX };
        if(speed < this.SPEED_LIMIT_MIN){ speed = this.SPEED_LIMIT_MIN };
        return this.BASE_SPEED - speed * this.SPEED_MULTIPLYER;
    }


    startMoving(){
        let _this = this;
        this.movingInterval = setInterval( function(){
            _this.move(_this);
        } , this.convertSpeed() );
    }
    
    move( person ){
        switch(this.direction){
            case heading.RIGHT: return person.setX(person.x + 0.3);
            case heading.LEFT: return person.setX(person.x - 0.3);
            case heading.TOP: return person.setY(person.y + 0.3);
            case heading.BOTTOM: return person.setY(person.y - 0.3);
        }
    }
       
    stopMoving() {
        clearInterval(this.movingInterval);
    }

    getLocation(){
        return new Point(ths.x, this.y);
    }

    getReachableArea(){ 

        switch(this.direction){
            case heading.TOP: 
                return Area.fromCoords(
                    this.y + this.reachableRadius,
                    this.y - this.reachableRadius / 2,
                    this.x + this.reachableRadius / 2,
                    this.x - this.reachableRadius / 2
                )
            case heading.BOTTOM: 
                return Area.fromCoords(
                    this.y + this.reachableRadius / 2,
                    this.y - this.reachableRadius,
                    this.x + this.reachableRadius / 2,
                    this.x - this.reachableRadius / 2
                )
            case heading.LEFT: 
                return Area.fromCoords(
                    this.y + this.reachableRadius / 2,
                    this.y - this.reachableRadius / 2,
                    this.x + this.reachableRadius,
                    this.x - this.reachableRadius / 2
                )
                
            case heading.RIGHT: 
                return Area.fromCoords(
                    this.y + this.reachableRadius / 2,
                    this.y - this.reachableRadius / 2,
                    this.x + this.reachableRadius / 2,
                    this.x - this.reachableRadius,
                )
        } 
    } 


    getItem(item){
        if(item.itemType == ItemType.VITAMIN_C){
            this.setSpeed(this.speed + VitaminC.SPEED_BOOST);
            return true;
        } else {
            return this.addToInventory(item);
        }
    }


    addToInventory(item){
        try {
            this.inventory.addItem(item);
        } catch(err) {
            return false;
        }
        return true;
    }

    removeFromInventory(item){
        try {
            this.inventory.removeItem(item);
        } catch(err) {
            return false;
        }
        return true;
    }
    
    canMove(){
        switch(this.direction){
            case heading.TOP: return this.y < 100;
            case heading.BOTTOM: return this.y > 26;
            case heading.LEFT: return this.x > -2;
            case heading.RIGHT: return this.x < 68;
        }
    }
}











export class PersonBuilder {

    temp = {}
    
    constructor(){
        this.refreshTempObj();
    }

    refreshTempObj(){
        this.temp.x = 50;
        this.temp.y = 50;
        this.temp.isMoving = false;
        this.temp.direction = heading.TOP;
        this.temp.id = "defaultId";
        this.temp.speed = 2;
        return this;
    }


    withId(id){ this.temp.id = id; return this; }
    withX(x){ this.temp.x = x; return this;  }
    withY(y){ this.temp.y = y; return this;  }
    withSpeed(speed){ this.temp.speed = speed; return this;  }
    withDirection(direction){ 
        direction = direction.toUpperCase();
        if(heading[direction] != undefined){
            this.temp.direction = heading[direction];
        } 
        return this; 
    }
    withIsMoving(isMoving){ 
        if(typeof isMoving == "boolean"){
            this.temp.isMoving = isMoving;
        }
        return this; 
    }

    build(){
        let person = new Person(this.temp.id);
        person.setX(this.temp.x);
        person.setY(this.temp.y);
        person.setIsMoving(this.temp.isMoving);
        person.setDirection(this.temp.direction);
        person.speed = this.temp.speed;

        this.refreshTempObj(); 
        return person;
    }
}



