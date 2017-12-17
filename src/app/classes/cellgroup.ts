import {Cell} from '../classes/cell';

export class CellGroup {
    cells : Cell [] = [];
    uvals : number [] = []; // Values already used on this row
    solver_value = 0;
    
    constructor(
    ) {
     }    

     solve () {
        this.solver1();
        this.solver2();
        this.solver3();
        this.solver4();
        this.solver5();
        
        // Value exists in one cell only

    }
    // If cell in cell group has only one possible value in any cell, other cells in cellgroup
    // should clear it out

    // function could use ARRAY:FOREACH -function call
    solver1 () {
        console.log("Solver 1:");
        var value = 0;
        for (let i = 0; i < 9; i++) {
            if ( this.cells[i].pvals.length === 1 ) {
                // TODO: Is there a nicer way to do this?
                //this.cells[i].pvals.toString();
                this.cells[i].value = +this.cells[i].pvals.toString();                
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
    // Pval exists in one cell only
    solver4 () {
        var value = 0;

        // if value can be found in one cell only and that cell has multiple
        // pvals, other pvals should be cleaned from it.
        for( let value = 1; value <= 9; value++ ) {
            let cells_tmp = this.whatCellsHavePval(value);
            if (cells_tmp.length === 1 ) {
                if (cells_tmp[0].pvals.length > 1) {
                    cells_tmp[0].pvals=[value];                    
                }
            }
        }
    }
    // If 2 values do not exist in more than 2 cells, other pvals
    // should be cleared also from these cells
    solver5 () {
        let values : number[] = [];
        // Find what values exist in 2 cells only
        values = this.whatValuesExistInTwoCellsOnly();
        let matchingPair : number[] = [];

        // To solve something one needs to have at least 2 values
        // what value pairs exist in same 2 cells
        // Find cells for value i
        //   Find cells for value 2..N
        //   If cells id's match, value pair found
        //   Clear other pvals from these 2 cells

        // what two value are in common in both cells and in values

        if (values.length > 1) {
            for( let value of values) {
                let cells = this.whatCellsHavePval(value);

                matchingPair = this.checkIfCellsMatchAsPair(cells, value, values);
                if (matchingPair.length === 2) {
                    console.log("Found mathing pair:" + matchingPair.toString());
                    console.log("");
                    cells[0].pvals = [];
                    cells[0].pvals.push(matchingPair[0]);
                    cells[0].pvals.push(matchingPair[1]);
                    cells[1].pvals = [];
                    cells[1].pvals.push(matchingPair[0]);
                    cells[1].pvals.push(matchingPair[1]);
                }
            }
        }
    }
    //-------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    checkIfCellsMatchAsPair(cells : Cell[], value1, possibleValues ) : number [] {
        // Check if both cells contain, some other value in the list

        let matchingPair : number [] = [];
        matchingPair.push(value1);
        for (let value of possibleValues) { // Value only in two cells
            if ( value !== value1 ) {
                if (this.isValueValidInBothCells(value, cells)) {
                        matchingPair.push(value);                    
                }
            }
        }
        return matchingPair;
    }
    //-------------------------------------------------------------------------------------------
    isValueValidInBothCells(value : number, cell : Cell[]) : boolean {
        return cell[0].pvals.includes(value) && cell[1].pvals.includes(value);
    }
    //-------------------------------------------------------------------------------------------
    isValueValidInCell(cell : Cell) : boolean {
        return cell.pvals.includes(this.solver_value);
    }
    //-------------------------------------------------------------------------------------------
    whatValuesExistInTwoCellsOnly() : number []{
        var ret : number [] = []
        for( let value = 1; value <= 9; value++ ) {
            let x = this.whatCellsHavePval(value);
            if(x.length === 2){
                ret.push(value);
            }
        }
        return ret;
    }
    //-------------------------------------------------------------------------------------------
    whatCellsHavePval(value) : Cell []{
        var ret : Cell [] = []
        for(let cell of this.cells) {
            if (cell.pvals.includes(value)){
                ret.push(cell);                
            }
        }            
        return ret;
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
                    this.removePvalFromCell(i,value);                    
                }
            }
        }
    }
    //-------------------------------------------------------------------------------------------
    removePvalFromOtherCells (index, value) {
        for(let i = 0; i < 9; i++) {
            if (i != index) {
                this.removePvalFromCell(i,value);
            }
        }
    }
    //-------------------------------------------------------------------------------------------
    removePvalFromCell(index, value) {
        var x = this.cells[index].pvals.indexOf(value);
        if (x > -1) {
            this.cells[index].pvals.splice(x,1);
        }
    }
    //-------------------------------------------------------------------------------------------
    // This should be used to clear all other elements from array
    //-------------------------------------------------------------------------------------------
    removeAllOtherPvalsFromCellExcept(cell, value) {
        var x = cell.pvals.indexOf(value);
        //if (x > -1) {
        //    this.cells[index].pvals.splice(x,1);
        //}
    }

   
}
