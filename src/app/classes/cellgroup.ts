import {Cell} from '../classes/cell';

export class CellGroup {
    cells : Cell [] = [];
    uvals : number [] = []; // Values already used on this row
    
    constructor(
    ) {
     }    

     solve () {
        this.solver1();
        this.solver2();
        this.solver3();
    }
    // If cell in cell group has only one possible value in any cell, other cells in cellgroup
    // should clear it out
    solver1 () {
        for(let i = 0; i < 9; i++) {
            if (this.cells[i].pvals.length === 1) {
                let value = this.cells[i].value;
                this.removePvalFromOtherCells(i,value);
            }
        }
    }
    // If 2 values are present in two cells only, those values should be cleared 
    // from other cells
    // Is there a 2nd case for this solver also..?
    solver2 () {
        var cellIndexes=[];
        for(let i = 0; i < 9; i++) {
            if (this.cells[i].pvals.length === 2) {
                cellIndexes = this.whatCellsHaveSamePvals(this.cells[i].pvals);
                if (cellIndexes.length===2) {
                    this.removePvalsFromOtherCells(cellIndexes, this.cells[i].pvals);
                }
            }
        }
    }
    // If 3 values are present in three cells only, those values should be cleared 
    // from other cells
    solver3 () {
        var cellIndexes=[];
        for(let i = 0; i < 9; i++) {
            if (this.cells[i].pvals.length === 3) {
                cellIndexes = this.whatCellsHaveSamePvals(this.cells[i].pvals);
                if (cellIndexes.length===3) {
                    this.removePvalsFromOtherCells(cellIndexes, this.cells[i].pvals);
                }
            }
        }
    }
    //-------------------------------------------------------------------------------------------
    whatCellsHaveSamePvals(pvals : number[] ) : number[] {
        var ret = [];
        for(let i = 0; i < 9; i++) {
            if (this.cells[i].pvals.toString() === pvals.toString()) {
                ret.push(i);
            }
        }            
        return ret;
    }
    //-------------------------------------------------------------------------------------------
    removePvalsFromOtherCells (cellIndexes:number[], values:number[]) {
        for(let i = 0; i < 9; i++) {
            if (cellIndexes.indexOf(i) < 0) {
                for (var value of values){
                    this.removeValueFromCell(i,value);                    
                }
            }
        }
    }
    //-------------------------------------------------------------------------------------------
    removePvalFromOtherCells (index, value) {
        for(let i = 0; i < 9; i++) {
            if (i != index) {
                this.removeValueFromCell(i,value);
            }
        }
    }
    //-------------------------------------------------------------------------------------------
    removeValueFromCell(index, value) {
        var x = this.cells[index].pvals.indexOf(value);
        if (x > -1) {
            this.cells[index].pvals.splice(x,1);
        }
    }
   
}
