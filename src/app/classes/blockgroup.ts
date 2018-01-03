import {CellGroup} from './cellgroup';
import {Cell} from './cell';

export class BlockGroup extends CellGroup{

    constructor()
    {
        super()
    }

    solve () {
        super.solve();
        this.values.forEach(this.solver7, this);
        this.cells.forEach(this.solver67_values, this);

    }
    
    // ========================================================================
    // Solver applies to block groups only:
    // Solver needs another solver for cleaning those values from same line group
    // If a value exists on this cellgroup inside one row or col only
    // i.e. in cells 0,1,2 or in cells 3,4,5 or in cells 6,7,8
    // value can be cleaned out from other cells of line group
    // ========================================================================
    solver7 (value : number, index : number, arr : number[]) {
        let cells_tmp = this.whatCellsHavePval(value);
        if (cells_tmp.length > 0 && cells_tmp.length < 4 ) {            
            if (cells_tmp.every(this.cellsOnSameRow)){
                this.setRowValsForCells(cells_tmp, value);
            }
            if (cells_tmp.every(this.cellsOnSameCol)){
                this.setColValsForCells(cells_tmp, value);
            }
        } 
    }
    // ========================================================================
    // If row values can be found from cell, remove those pvals from other 
    // cells of the line group
    solver67_values ( cell : Cell, index : number, arr : Cell[] ) {
        for ( let value of cell.rowValues ) {
            this.removePvalFromOtherTargetsOnCellGroup('row', value, cell.row);
        }    
        for ( let value of cell.colValues ) {
            this.removePvalFromOtherTargetsOnCellGroup('col', value, cell.col);
        }    
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

}
