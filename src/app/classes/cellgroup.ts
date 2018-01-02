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
        // this.cells.forEach(this.solver1, this);
        // this.cells.forEach(this.solver2, this);
        //this.cells.forEach(this.solver3, this);

        this.cells.forEach(this.solver123, this);

        this.values.forEach(this.solver4, this);
        this.solver5();

        this.values.forEach(this.solver6, this);
        this.values.forEach(this.solver7, this);

        this.cells.forEach(this.solver67_values, this);

    }
    // ========================================================================
    // If 3 values are present in three cells only, those values should be cleared 
    // from other cells
    solver123 ( cell : Cell, index : number, arr : Cell[] ) {
        var cellIndexes = [];
        if ( cell.pvals.length === 1 ) {
            // TODO: Is there a nicer way to do this?
            cell.value = +cell.pvals.toString();
            this.removePvalsFromOtherCells([index], [cell.value]);
        }
        cellIndexes = this.whatCellsHaveSamePvals(cell.pvals);
        if ( cell.pvals.length === cellIndexes.length ) {
                this.removePvalsFromOtherCells(cellIndexes, cell.pvals);
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
                cells_tmp[0].value = +cells_tmp[0].pvals.toString();
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
    // ========================================================================
    // Solver applies to line groups only:
    // Solver needs another solver for cleaning those values from same block
    // If a value exists on this cellgroup inside one block only
    // i.e. in cells 0,1,2 or in cells 3,4,5 or in cells 6,7,8
    // value can be cleaned out from other lines of a block group
    // ========================================================================
    solver6 (value : number, index : number, arr : number[]) {
        if ( ! this.isBlockGroup() ){
            let cells_tmp = this.whatCellsHavePval(value);
            if (cells_tmp.length > 0 && cells_tmp.length < 4 ) {
                if (cells_tmp.every(this.cellsOnSameBlock, this)) {
                    if (this.isRowGroup()) {
                        this.setRowValsForCells(cells_tmp, value);
                    }
                    if (this.isColGroup()) {
                        this.setColValsForCells(cells_tmp, value);
                    }
                }
            } 
        }
    }
    // ========================================================================
    // Solver applies to block groups only:
    // Solver needs another solver for cleaning those values from same line group
    // If a value exists on this cellgroup inside one row or col only
    // i.e. in cells 0,1,2 or in cells 3,4,5 or in cells 6,7,8
    // value can be cleaned out from other cells of line group
    // ========================================================================
    solver7 (value : number, index : number, arr : number[]) {
        if ( this.isBlockGroup() ){
            console.log("Solver 8 finds a block group");
            let cells_tmp = this.whatCellsHavePval(value);
            if (cells_tmp.length > 0 && cells_tmp.length < 4 ) {
                console.log("Cells_tmp : " + cells_tmp.toString());
                
                if (cells_tmp.every(this.cellsOnSameRow)){
                    console.log("Found values on same row : " + value);
                    this.setRowValsForCells(cells_tmp, value);
                }
                if (cells_tmp.every(this.cellsOnSameCol)){
                    console.log("Found values on same col : " + value);
                    this.setColValsForCells(cells_tmp, value);
                }
            } 
        }
    }
    // ========================================================================
    // If row values can be found from cell, remove those pvals from other 
    // cells of the line group
    solver67_values ( cell : Cell, index : number, arr : Cell[] ) {
        if ( this.isRowGroup() ){
            for ( let value of cell.rowValues ) {
                this.removePvalFromOtherTargetsOnCellGroup('block', value, cell.block);
            }    
        }   
        if ( this.isColGroup() ){
            for ( let value of cell.colValues ) {
                this.removePvalFromOtherTargetsOnCellGroup('block', value, cell.block);
            }    
        }   
        if ( this.isBlockGroup() ){
            for ( let value of cell.rowValues ) {
                this.removePvalFromOtherTargetsOnCellGroup('row', value, cell.row);
            }    
            for ( let value of cell.colValues ) {
                this.removePvalFromOtherTargetsOnCellGroup('col', value, cell.col);
            }    
        }   
    }
    //-------------------------------------------------------------------------------------------
    // Where target = row, col, block
    removePvalFromOtherTargetsOnCellGroup ( param : string, pval : number, index : number ) {
        let cells = this.cells.filter(this.cellParamValueIsNot(param, index));
        this.removePvalFromCells( cells, pval );
    }
    //-------------------------------------------------------------------------------------------
    // Cell row/col/block is not y
    cellParamValueIsNot ( item : string,  value : number ) : any {
        return function (cell : Cell) { return (cell.getParam(item) !== value); };
    }
    //-------------------------------------------------------------------------------------------
    setRowValsForCells( cells : Cell[], value : number ) : void {
        for (let cell of cells) {
            // Insert value to array only once
            if (cell.rowValues.indexOf(value) < 0){
                cell.rowValues.push(value);
            }
        }
    }
    //-------------------------------------------------------------------------------------------
    setColValsForCells( cells : Cell[], value : number ) : void {
        for (let cell of cells) {
            // Insert value to array only once
            if (cell.colValues.indexOf(value) < 0){
                cell.colValues.push(value);
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
        for( let value of this.values ) {
                let x = this.whatCellsHavePval(+value);
            if(x.length === 2){
                ret.push(+value);
            }
        }
        return ret;
    }
    //-------------------------------------------------------------------------------------------
    // Hyvä esimerkki callbackista?
    //-------------------------------------------------------------------------------------------
    whatCellsHavePval( value ) : Cell []{
        return this.cells.filter( function(cell, index) {            
                return (cell.pvals.includes(value))
            }
        );    
    }
    //-------------------------------------------------------------------------------------------
    // Note: returns indexes of cells, not cells
    whatCellsHaveSamePvals( pvals : number[] ) : number[] {
        var ret = [];
        for( let i in this.cells ) {
            if (this.cells[i].pvals.toString() === pvals.toString()) {
                ret.push(+i);
            }
        }            
        return ret;
    }
    //-------------------------------------------------------------------------------------------
    isRowGroup ( ) : boolean {
        return (this.cells[0].row === this.cells[8].row);        
    }
    //-------------------------------------------------------------------------------------------
    isColGroup ( ) : boolean {
        return this.cells[0].col === this.cells[8].col;        
    }
    //-------------------------------------------------------------------------------------------
    isBlockGroup ( ) : boolean {
        return (this.cells[0].col+2) === (this.cells[8].col);        
    }
    //-------------------------------------------------------------------------------------------
    // Callback returning boolean value
    //-------------------------------------------------------------------------------------------
    cellsOnSameBlock(el : Cell, index, arr) : boolean {
        if (index === 0) return true;
        return ( el.block === arr[index-1].block );
    }
    //-------------------------------------------------------------------------------------------
    cellsOnSameRow(el, index, arr) : boolean  {
        if (index === 0) return true;
        return (el.row === arr[index - 1].row);
    }
    //-------------------------------------------------------------------------------------------
    cellsOnSameCol(el, index, arr) : boolean  {
        if (index === 0) return true;
        return (el.col === arr[index - 1].col);
    }
    //-------------------------------------------------------------------------------------------
    removePvalsFromOtherCells ( cellIndexes : number [], values : number [] ) {
        for( let i in this.cells ) {
            if (cellIndexes.indexOf(+i) < 0) {
                for (var value of values){
                    this.removePvalFromCell(this.cells[+i],value);                    
                }
            }
        } 
    }
    //-------------------------------------------------------------------------------------------
    removePvalFromCells( cells : Cell[], value : number ) {
        for( let cell of cells ) {
            this.removePvalFromCell( cell, value );
        }
    }   
    //-------------------------------------------------------------------------------------------
    removePvalFromCell( cell : Cell, value : number ) {
        var x = cell.pvals.indexOf(value);
        if (x > -1) {
            cell.pvals.splice(x,1);
        }
        cell.pvals = [].concat(cell.pvals);
    }   
}
