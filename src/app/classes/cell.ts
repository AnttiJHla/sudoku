import { CellGroup } from '../classes/cellgroup';

export class Cell {
    value : number = 0;
    rowgrp: CellGroup;
    colgrp: CellGroup;
    blockgrp: CellGroup;
    pvals : number[] = []; // Possible values
    row : number;
    col : number;

    constructor(value: number        
      ) {
            this.value = value;
            if (value === 0){
                this.pvals = [1,2,3,4,5,6,7,8,9];
            } else{
                this.pvals = [value];
            }
       }    
}
