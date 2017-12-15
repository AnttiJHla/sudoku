import { Component, OnInit } from '@angular/core';
import { Matrix } from '../classes/matrix';
import { Cell } from '../classes/cell';
@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {

  matrixVals : number [] = [
    0,0,0,0,0,0,0,0,0,
    0,1,0,0,0,0,0,0,0,
    0,0,2,0,0,0,0,0,0,
    0,0,0,3,0,0,0,0,0,
    0,0,0,0,4,0,0,0,0,
    0,0,0,0,0,5,0,0,0,
    0,0,0,0,0,0,6,0,0,
    0,0,0,0,0,0,0,7,0,
    0,0,0,0,0,0,0,0,8
  ];
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
  matrix : Matrix = new Matrix (this.matrixVals_l2);



  constructor() { }

  ngOnInit() {
  }


  getCellClass(cell: Cell) : string[] {
    var retVal : string[] = [];
    var rowList = [1,2,3,7,8,9];
    var tmp=true;
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

}
