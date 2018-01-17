import { Cell } from './cell';

export class CellTracker {

    cells : Cell[][];    
    constructor () {
        this.cells = [];
        this.cells[1]=[];
        this.cells[2]=[];
        this.cells[3]=[];
        this.cells[4]=[];
        this.cells[5]=[];
        this.cells[6]=[];
        this.cells[7]=[];
        this.cells[8]=[];
        this.cells[9]=[];
    }

    //---------------------------------------------
    saveState ( cell : Cell ) {
        
        this.cells[cell.row][cell.col] = cell;
    }
    //---------------------------------------------
    stateHasChanged ( cell : Cell ) : boolean {
        let pvalsChanged = this.pvalsChanged(cell);
        let colValsChanged = this.colValsChanged(cell);
        let rowValsChanged = this.rowValsChanged(cell);

        console.log("Checking state changes for cell: " + cell.row + ", " + cell.col );
        if (pvalsChanged)
            console.log("Pvals have changed for cell");
        if (colValsChanged)
            console.log("Col values have changed for cell");
        if (rowValsChanged)
            console.log("Row values have changed for cell");

        return colValsChanged || rowValsChanged || pvalsChanged;
    }
    //---------------------------------------------
    pvalsChanged( cell : Cell ) {
        let tmp = this.getStoredCell(cell);
        //console.log("Pvals: " + tmp.pvals.toString() + ", " + cell.pvals.toString());
        return ( tmp.pvals.toString() !== cell.pvals.toString() );
    }
    //---------------------------------------------
    rowValsChanged( cell : Cell ) {
        let tmp = this.getStoredCell(cell);
        return ( tmp.rowValues.toString() !== cell.rowValues.toString() );
    }
    //---------------------------------------------
    colValsChanged( cell : Cell ) {
        let tmp = this.getStoredCell(cell);
        return ( tmp.colValues.toString() !== cell.colValues.toString() );
    }
    //---------------------------------------------    
    getStoredCell( cell : Cell ) {
        return this.cells[cell.row][cell.col];
    }

}
