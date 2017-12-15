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
                this.pvals = [1,2,3,4,5,6,7,8,9];
            } else{
                this.pvals = [value];
                this.initialized = true;
            }
       }    
}
