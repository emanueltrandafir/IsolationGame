import { DataTypesUtil } from "./dataTypes.js";


export class Point{

    x; y;
    constructor(x,y){
        DataTypesUtil.assertNumber(x);
        DataTypesUtil.assertNumber(y);
        this.x = x;
        this.y = y;
    }
}


export class Area{
    
    NW; NE; SW; SE;

    constructor(A,B,C,D){
        DataTypesUtil.assertPoint(A);
        DataTypesUtil.assertPoint(B);
        DataTypesUtil.assertPoint(C);
        DataTypesUtil.assertPoint(D);
        this.NW = A;
        this.NE = B;
        this.SE = C;
        this.SW = D;
    }

    getNorth(){
        return this.NE.y;
    }
    getSouth(){
        return this.SE.y;
    }
    getEast(){
        return this.SE.x;
    }
    getWest(){
        return this.SW.x;
    }
    
    containsPoint(P){
        DataTypesUtil.assertPoint(P);
        if( this.getNorth() > P.y &&
            this.getSouth() < P.y &&
            this.getEast() > P.x && 
            this.getWest() < P.x ) {
                return true;
        } else {
            return false;
        }
    }

    static fromCoords(n,s,e,w){
        let NW = new Point(w,n);
        let NE = new Point(e,n);
        let SW = new Point(w,s);
        let SE = new Point(e,s);
        return new Area (NW, NE, SE, SW);
    }
}