import { CellGroup } from '../classes/cellgroup';

export class Cell {
    value : number = 0;
    rowgrp: CellGroup;
    colgrp: CellGroup;
    blockgrp: CellGroup;
    pvals : number[] = []; // Possible values
    row : number;
    col : number;
    initialized : boolean = false;

    constructor(value: number, row : number, col : number )
    {
            this.value = value;
            this.col = col;
            this.row = row;
            if (value === 0){
                this.pvals = [];
                for ( let i = 1; i <= 9; i++ ) {                    
                    this.pvals.push(i);
                }

            } else{
                this.pvals = [value];
                this.initialized = true;
            }
       }    
}
