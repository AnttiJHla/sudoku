
import { Cell } from './cell';
import {CellGroup} from './cellgroup';

export class Changetracker {
    cells : Cell [] = [];
    values = [1,2,3,4,5,6,7,8,9];
    cg : CellGroup;


    trackChanges ( cg : CellGroup ) {
        this.cells = cg.cells;
        this.cg = cg;

        let pvalsChanged = this.pvalsChanged();
        let colValsChanged = this.colValsChanged();
        let rowValsChanged = this.rowValsChanged();

        if ( pvalsChanged ) {
            this.cg.pvalsLength = this.getArrLength("pvals");
            console.log("Tracker: pvals changed");
        };
        if ( rowValsChanged ) {
            this.cg.rowValsLength = this.getArrLength("rowValues");
            console.log("Tracker: row values changed");
        };
        if ( colValsChanged ) {
            this.cg.colValsLength = this.getArrLength("colValues");
            console.log("Tracker: col values changed");
        };

        if ( colValsChanged || rowValsChanged || pvalsChanged ){
            this.cg.changed = true;
        } else {
            this.cg.changed = false;
        }

    }
    //---------------------------------------------
    pvalsChanged() {
        return (this.cg.pvalsLength !== this.getArrLength("pvals"));    
    }
    //---------------------------------------------
    rowValsChanged() {
        return (this.cg.rowValsLength !== this.getArrLength("rowValues"));    
    }
    //---------------------------------------------
    colValsChanged() {
        return (this.cg.colValsLength !== this.getArrLength("colValues"));    
    }
    //---------------------------------------------
    getArrLength (arrName) : number {
        let tmp = 0;
        this.cells.forEach(
            (cell) => tmp =+ cell.getParam(arrName).length
        );
        return tmp;
    }
    

}
