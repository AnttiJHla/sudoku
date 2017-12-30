import { NgZone, Component, Input, OnInit } from '@angular/core';
import { Matrix } from '../classes/matrix';

import { Cell } from '../classes/cell';
@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {

  matrixVals_l0 : number [] = [
    0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0,

    0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0,

    0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0,
    0,0,0, 0,0,0, 0,0,0,

  ];
  matrixVals_l5_4 : number [] = [
    5,0,3, 0,1,0, 0,0,0,
    0,0,0, 0,0,0, 2,0,0,
    8,0,0, 9,0,7, 0,0,4,

    0,0,8, 0,0,0, 0,0,5,
    0,6,5, 0,0,0, 8,1,0,
    2,0,0, 0,0,0, 4,0,0,

    4,0,0, 8,0,6, 0,0,7,
    0,0,6, 0,0,0, 0,0,0,
    0,0,0, 0,3,0, 1,0,2,

  ];
  matrixVals_l5_3 : number [] = [
    6,0,8, 0,0,4, 2,0,0,
    2,0,7, 0,0,0, 0,0,9,
    1,5,0, 0,0,2, 0,0,0,

    0,0,6, 5,0,0, 0,0,0,
    0,0,0, 9,0,1, 0,0,0,
    0,0,0, 0,0,8, 6,0,0,

    0,0,0, 1,0,0, 0,4,2,
    7,0,0, 0,0,0, 3,0,5,
    0,0,1, 8,0,0, 9,0,6,

  ];
  matrixVals_l5 : number [] = [
    0,1,0, 0,0,0, 5,0,2,
    4,0,0, 0,0,0, 9,0,0,
    0,0,3, 9,0,0, 0,7,0,

    0,0,4, 0,1,9, 6,0,0,
    5,0,0, 0,0,0, 0,0,8,
    0,0,6, 4,2,0, 3,0,0,

    0,4,0, 0,0,2, 8,0,0,
    0,0,2, 0,0,0, 0,0,3,
    3,0,9, 0,0,0, 0,1,0,

  ];
  matrixVals_l5_2 : number [] = [
    0,0,0, 0,0,0, 0,1,4,
    0,0,0, 5,0,2, 0,9,0,
    8,0,0, 0,4,1, 0,0,0,

    0,3,0, 0,0,0, 1,0,9,
    6,0,0, 9,0,7, 0,0,2,
    5,0,4, 0,0,0, 0,7,0,

    0,0,0, 8,7,0, 0,0,6,
    0,2,0, 3,0,6, 0,0,0,
    3,6,0, 0,0,0, 0,0,0,

  ];
  matrixVals_l2 : number [] = [
    2,8,0, 0,0,0, 4,0,0,
    3,0,0, 0,2,0, 0,9,0,
    0,0,6, 5,3,0, 2,0,0,

    0,0,0, 0,0,0, 0,5,6,
    0,4,2, 0,0,0, 9,7,0,
    1,5,0, 0,0,0, 0,0,0,

    0,0,3, 0,6,5, 7,0,0,
    0,6,0, 0,4,0, 0,0,9,
    0,0,9, 0,0,0, 0,6,2,

  ];
  matrixVals_l3 : number [] = [
    6,0,0, 1,0,9, 0,7,0,
    0,0,0, 0,0,0, 2,9,0,
    9,0,0, 7,0,0, 4,0,8,

    0,0,0, 3,0,1, 0,0,5,
    0,3,0, 0,9,0, 0,1,0,
    1,0,0, 5,0,2, 0,0,0,

    7,0,2, 0,0,8, 0,0,4,
    0,9,6, 0,0,0, 0,0,0,
    0,1,0, 2,0,3, 0,0,9,

  ];


  @Input()
  matrix : Matrix = new Matrix (this.matrixVals_l5_4);



  constructor(private _ngZone: NgZone) {}
  

  ngOnInit() {
  }


  getCellClass(cell: Cell) : string[] {
    var retVal : string[] = [];
    var rowList = [1,2,3,7,8,9];
    var tmp=true;

    if (cell.initialized) {
      retVal.push("cell-initialized");
    }

    if (rowList.includes(cell.row)) {
      tmp = !tmp;      
    }
    if (rowList.includes(cell.col)) {
      tmp = !tmp;      
    }
    if (tmp) {
      retVal.push("bg-gray");     
    } 
    
    return retVal;

  }

  solve () {
    this.matrix.solve();

  }


  writeLog () {
    this.matrix.writeLog();
    this.matrix.cells[1][1].pvals.splice(0,1);
  }

}
