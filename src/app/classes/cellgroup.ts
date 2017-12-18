import {Cell} from '../classes/cell';

export class CellGroup {
    cells : Cell [] = [];
    uvals : number [] = []; // Values already used on this row
    solver_value = 0;

    // Dummy array to be used to replace for loops...
    values = [1,2,3,4,5,6,7,8,9];
    
    constructor(
    ) {
     }    

     solve () {
        this.cells.forEach(this.solver1, this);
        this.cells.forEach(this.solver2, this);
        this.cells.forEach(this.solver3, this);
        this.values.forEach(this.solver4, this);
        this.solver5();
        
        // Value exists in one cell only

    }
    // ========================================================================
    // If cell in cell group has only one possible value in any cell, other cells in cellgroup
    // should clear it out
    solver1 ( cell : Cell, index : number, arr : Cell[] ) {
        if ( cell.pvals.length === 1 ) {
            // TODO: Is there a nicer way to do this?
            cell.value = +cell.pvals.toString();
            this.removePvalFromOtherCells(index, cell.value);
        }
    }
    // ========================================================================
    // If 2 values are present in two cells only, those values should be cleared 
    // from other cells
    // Is there a 2nd case for this solver also..?
    solver2 ( cell : Cell, index : number, arr : Cell[] ) {
        var cellIndexes=[];
        if ( cell.pvals.length === 2 ) {
            cellIndexes = this.whatCellsHaveSamePvals(cell.pvals);
            if ( cellIndexes.length === 2 ) {
                this.removePvalsFromOtherCells(cellIndexes, cell.pvals);
            }
        }
    }
    // ========================================================================
    // If 3 values are present in three cells only, those values should be cleared 
    // from other cells
    solver3 ( cell : Cell, index : number, arr : Cell[] ) {
        var cellIndexes = [];
        if ( cell.pvals.length === 3 ) {
            cellIndexes = this.whatCellsHaveSamePvals( cell.pvals );
            if (cellIndexes.length === 3) {
                this.removePvalsFromOtherCells(cellIndexes, cell.pvals);
            }
        }
    }
    // ========================================================================
    // Pval exists in one cell only
    solver4 (value : number, index : number, arr : number[]) {
        // if value can be found in one cell only and that cell has multiple
        // pvals, other pvals should be cleaned from it.
        let cells_tmp = this.whatCellsHavePval(value);
        if (cells_tmp.length === 1 ) {
            if (cells_tmp[0].pvals.length > 1) {
                cells_tmp[0].pvals = [value];                    
            }
        }
    }
    // ========================================================================
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
                    cells[0].pvals = [].concat(matchingPair);
                    cells[1].pvals = [].concat(matchingPair);
                }
            }
        }
    }
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
    whatCellsHavePval( value ) : Cell []{
        var ret : Cell [] = []
        for(let cell of this.cells) {
            if (cell.pvals.includes(value)){
                ret.push(cell);                
            }
        }            
        return ret;
    }
    //-------------------------------------------------------------------------------------------

    whatCellsHaveSamePvals( pvals : number[] ) : number[] {
        var ret = [];
        for( let i = 0; i < 9; i++ ) {
            if (this.cells[i].pvals.toString() === pvals.toString()) {
                ret.push(i);
            }
        }            
        return ret;
    }
    //-------------------------------------------------------------------------------------------
    removePvalsFromOtherCells ( cellIndexes : number [], values : number [] ) {
        for( let i = 0; i < 9; i++ ) {
            if (cellIndexes.indexOf(i) < 0) {
                for (var value of values){
                    this.removePvalFromCell(i,value);                    
                }
            }
        }
    }
    //-------------------------------------------------------------------------------------------
    removePvalFromOtherCells ( index, value ) {
        for( let i = 0; i < 9; i++ ) {
            if (i != index) {
                this.removePvalFromCell( i, value );
            }
        }
    }
    //-------------------------------------------------------------------------------------------
    //removePvalFromCell (cell : Cell, index : number, arr : Cell[]) {
    removePvalFromCell( index, value ) {
        var x = this.cells[index].pvals.indexOf(value);
        if (x > -1) {
            this.cells[index].pvals.splice(x,1);
        }
        // Creates a new array of existing array for change detection
        this.cells[index].pvals = [].concat(this.cells[index].pvals);
    }   
}
