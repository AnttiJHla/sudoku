import { CellTracker } from "./cell-tracker";

export class Cell {
    value : number = 0;
    pvals : number[] = []; // Possible values

    rowValues : number[] = []; // Values on this row only
    colValues : number[] = []; // Values on this col only
    row : number;
    col : number;
    block : number;
    initialized : boolean = false; // used by GUI
    tracker : CellTracker;

    constructor(value: number, row : number, col : number, ct : CellTracker )
    {
        this.value = value;
        this.col = col;
        this.row = row;
        this.block = this.getBlock();
        this.tracker = ct;

        if ( value === 0 ){
            this.createPvalsArray();
        } else{
            this.pvals = [value];
            this.initialized = true;
        }
        this.saveState();
    }    
    // --------------------------------------------------
    createPvalsArray( ) {
        this.pvals = [];
        for ( let i = 1; i <= 9; i++ ) {                    
            this.pvals.push(i);
        }
    }
    // --------------------------------------------------
    saveState( ) {
        this.tracker.saveState( this );
    }
    // --------------------------------------------------
    cellStateHasChanged( ) : boolean {        
        return this.tracker.stateHasChanged( this );;
    }
    // --------------------------------------------------
    getBlock( ) : number {
        var tmp = [0,1,1,1,2,2,2,3,3,3];
        var col = tmp[this.col];
        var row = tmp[this.row];
        return col+(row-1)*3;        
    }
    // --------------------------------------------------
    getParam( param : string ) : any {
        let ret = null;
        switch (param) {
        case "row": ret = this.row; break;
        case "col": ret = this.col; break;
        case "block": ret = this.block; break;
        case "pvals": ret = this.pvals; break;
        case "colValues": ret = this.colValues; break;
        case "rowValues": ret = this.rowValues; break;
        }
        return ret;
    }
    //-------------------------------------------------------------------------------------------
    removePvals ( values : number [] ) {
        for (var value of values){
            this.removePval(value);                    
        }
    }
    
    //-------------------------------------------------------------------------------------------
    removePval( value : number ) {
        var x = this.pvals.indexOf(value);
        if (x > -1) {
            this.pvals.splice(x,1);
        }
        this.pvals = [].concat(this.pvals);
    }   
    //-------------------------------------------------------------------------------------------
    addRowVal(value : number ) : void {
        if (this.rowValues.indexOf(value) < 0){
            this.rowValues.push(value);
        }
    }    
    //-------------------------------------------------------------------------------------------
    addColVal(value : number ) : void {
        if (this.colValues.indexOf(value) < 0){
            this.colValues.push(value);
        }
    }    
    
           
}
