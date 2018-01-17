import { Cell } from '../classes/cell';

import { Rowsolver } from '../classes/rowsolver';
import { Colsolver } from '../classes/colsolver';
import { Blocksolver } from '../classes/blocksolver';

import { Changetracker } from '../classes/changetracker';
import { CellTracker } from '../classes/cell-tracker';

import { CellGroup } from '../classes/cellgroup';


export class Matrix {
    
    cells : Cell[][];
    rowGroups : CellGroup[] = [];
    colGroups : CellGroup[] = [];
    blockGroups : CellGroup[] = [];
    cellTracker : CellTracker;
   
    constructor( values : number[] ) {
        this.cellTracker = new CellTracker();
        this.createCellArrayWithCells( values );
        this.createCellGroups();
        this.addCellsToCellGroups();

    }
    // -------------------------------------------------------------------
    createCellGroups(  ) {
        let rowSolver   = new Rowsolver();
        let colSolver   = new Colsolver();
        let blockSolver = new Blocksolver();
        let tracker     = new Changetracker();

        for ( let i = 1; i <= 9; i++ ) {
            this.rowGroups[i]   = new CellGroup( rowSolver, tracker );
            this.colGroups[i]   = new CellGroup( colSolver, tracker );
            this.blockGroups[i] = new CellGroup( blockSolver, tracker );
        }
    }
    // -------------------------------------------------------------------
    createCellArrayWithCells( values : number[] ) {
        this.cells=[];

        for (let row = 0; row < 9; row++ ) {
            this.cells[row] = [];
            for (let col = 0; col < 9; col++ ) {
                let value = values[ row*9 + col];
                let cell = new Cell(value, row + 1, col + 1, this.cellTracker );
                this.cells[row][col] = cell;                
            }
        }        
    }
    // -------------------------------------------------------------------
    addCellsToCellGroups( ) {
        for (let row = 0; row < 9; row++ ) {
            for (let col = 0; col < 9; col++ ) {
                let cell = this.cells[row][col];
                this.rowGroups[cell.row].cells.push(cell);
                this.colGroups[cell.col].cells.push(cell);
                this.blockGroups[cell.block].cells.push(cell);
            }
        }
    }
    // -------------------------------------------------------------------
    solve(){
        console.log("------------------------------");
        console.log("Solving cell groups:");
        console.log("------------------------------");
        for ( let i = 1; i <= 9; i++ ) {
            console.log("Block num: " + i);
            this.rowGroups[i].solve();
            this.colGroups[i].solve();
            this.blockGroups[i].solve();
        }
        //this.trackChanges();
        this.saveCellStates();
    }
    // -------------------------------------------------------------------
    saveCellStates(){
        for (let row = 0; row < 9; row++ ) {
            for (let col = 0; col < 9; col++ ) {
                let cell = this.cells[row][col];
                cell.saveState();
            }
        }
    }
    // -------------------------------------------------------------------
      
}
