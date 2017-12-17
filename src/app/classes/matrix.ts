import { Cell } from '../classes/cell';
import { CellGroup } from '../classes/cellgroup';

export class Matrix {
    
    cells : Cell[][];
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
        /*
        this.solve();
        while (!this.matrixHasBeenSolved()) {
            this.solve();            
        }
        this.solve();            
        this.solve();            
        this.solve();            
        this.solve();            
        this.solve();            
        */
    }

    matrixHasBeenSolved(  ) : boolean {
        var tmp = true;
        var cell : Cell;
        for (let row = 0; row < 9; row++ ) {
            for (let col = 0; col < 9; col++ ) {
                cell = this.cells[row][col]
                if (cell.pvals.length === 1 && cell.value === 0)
                    tmp = false;
            }
        }        
        return tmp;
    }

      initCellGroups(  ) {
        for ( let i = 1; i <= 9; i++ ) {
            this.rowGroups[i] = new CellGroup();
            this.colGroups[i] = new CellGroup();
            this.blockGroups[i] = new CellGroup();
        }
      }

      addCellToCellGroups( cell : Cell ) {
        var x = this.getBlockGroupOfCell(cell);
        console.log("Adding cell to cell groups");
        this.rowGroups[cell.row].cells.push(cell);
        this.colGroups[cell.col].cells.push(cell);
        this.blockGroups[x].cells.push(cell);
      }

      getBlockGroupOfCell( cell : Cell ) : number {
          var tmp = [0,1,1,1,2,2,2,3,3,3];
          var col = tmp[cell.col];
          var row = tmp[cell.row];
          return col+(row-1)*3;
      }

      solve(){
        for ( let i = 1; i <= 9; i++ ) {
            console.log("Block num: " + i);
            this.rowGroups[i].solve();
            this.colGroups[i].solve();
            this.blockGroups[i].solve();
        }
      }

      writeLog(){
          console.log("Writing log: " + 
          this.cells[1][1].pvals.toString());
          this.cells[1][1].pvals.push(10);
          this.cells[1][1].pvals.pop();
        }
      
}
