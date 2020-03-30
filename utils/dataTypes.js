import { Point } from "./navigation.js";

export class DataTypesUtil{

    static assertNumber(x){
        if(!typeof x == "number"){
            throw "wrong data type exception: a number is needed."
        }
    }
    
    static assertInt(x){
        this.assertNumber(x);
        if( !Number.isInteger(x) ){
            throw "wrong data type exception: an int is needed, found: " + x;
        }
    }
    
    static assertPoint(P){
        try {
            let P2 = new Point(P.x, P.y);
            if( JSON.stringify(P) != JSON.stringify(P2) ){
                throw "wrong data type exception: a Point is needed."
            }
        } catch (error) {
            throw "wrong data type exception: a Point is needed."
        }
    }
    
    static assertArrayContains(arr, el){
        if( !Array.isArray(arr) || arr.indexOf(el) == -1 ){
            throw "wrong data type exception: element" + el + "is contained by the array."
        }
    }

    static assertEnumContains(enumObj, el){
        if( Object.values(enumObj).indexOf(el) == -1 ){
            throw "wrong data type exception: element " + el + " not in enum " + enumObj;
        }
    }

}
