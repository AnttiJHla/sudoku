import { Cell } from '../classes/cell';
// import { RowGroup } from '../classes/rowgroup';
// import { ColGroup } from '../classes/colgroup';
// import { BlockGroup } from '../classes/blockgroup';

import { Rowsolver } from '../classes/rowsolver';
import { Colsolver } from '../classes/colsolver';
import { Blocksolver } from '../classes/blocksolver';
import { CellGroup } from '../classes/cellgroup';


export class Matrix {
    
    cells : Cell[][];
    // rowGroups : RowGroup[] = [];
    // colGroups : ColGroup[] = [];
    // blockGroups : BlockGroup[] = [];

    rowGroups : CellGroup[] = [];
    colGroups : CellGroup[] = [];
    blockGroups : CellGroup[] = [];
    
    constructor( values : number[] ) {
        this.initCellGroups();
        this.cells=[];
        for (let row = 0; row < 9; row++ ) {
            this.cells[row] = [];
            for (let col = 0; col < 9; col++ ) {
                this.cells[row][col] = new Cell(values[row*9+col], row+1, col+1);                
                this.addCellToCellGroups(this.cells[row][col]);
            }
        }        
    }

    initCellGroups(  ) {
        let rowSolver = new Rowsolver();
        let colSolver = new Colsolver();
        let blockSolver = new Blocksolver();
        for ( let i = 1; i <= 9; i++ ) {
            // this.rowGroups[i] = new RowGroup();
            // this.colGroups[i] = new ColGroup();
            // this.blockGroups[i] = new BlockGroup();
            this.rowGroups[i] = new CellGroup(rowSolver);
            this.colGroups[i] = new CellGroup(colSolver);
            this.blockGroups[i] = new CellGroup(blockSolver);
        }
    }

    addCellToCellGroups( cell : Cell ) {
        console.log("Adding cell to cell groups");
        this.rowGroups[cell.row].cells.push(cell);
        this.colGroups[cell.col].cells.push(cell);
        this.blockGroups[cell.block].cells.push(cell);
    }

    solve(){
        for ( let i = 1; i <= 9; i++ ) {
            console.log("Block num: " + i);
            this.rowGroups[i].solve();
            this.colGroups[i].solve();
            this.blockGroups[i].solve();
        }
    }

      
}
