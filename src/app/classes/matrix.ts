import { Cell } from '../classes/cell';

export class Matrix {
    
    cells : Cell[][];

    constructor( values : number[]) {
        
        this.cells=[];
        for (let row = 0; row < 9; row++ ) {
            this.cells[row] = [];
            for (let col = 0; col < 9; col++ ) {
                this.cells[row][col] = new Cell(values[row*9+col], row+1, col+1);
                
            }
        }        
      }
      
}
