import {CellGroup} from './cellgroup';
import {Cell} from './cell';

export class RowGroup extends CellGroup {

    constructor()
    {
        super()
    }    
    solve () {
        super.solve();
        this.values.forEach(this.solver6, this);
        this.cells.forEach(this.solver67_values, this);

    }

    // ========================================================================
    // Solver applies to line groups only:
    // Solver needs another solver for cleaning those values from same block
    // If a value exists on this cellgroup inside one block only
    // i.e. in cells 0,1,2 or in cells 3,4,5 or in cells 6,7,8
    // value can be cleaned out from other lines of a block group
    // ========================================================================
    solver6 (value : number, index : number, arr : number[]) {
        let cells_tmp = this.whatCellsHavePval(value);
        if (cells_tmp.length > 0 && cells_tmp.length < 4 ) {
            if (cells_tmp.every(this.cellsOnSameBlock, this)) {
                this.setRowValsForCells(cells_tmp, value);
            }
        } 
    }
    // ========================================================================
    // If row values can be found from cell, remove those pvals from other 
    // cells of the line group
    solver67_values ( cell : Cell, index : number, arr : Cell[] ) {
        for ( let value of cell.rowValues ) {
            this.removePvalFromOtherTargetsOnCellGroup('block', value, cell.block);
        }   
    }
    

}
