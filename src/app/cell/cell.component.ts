import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../classes/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})

export class CellComponent implements OnInit {
  
  @Input() cell: Cell;
  @Input() pvals: number [];
  constructor() { }

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
      retVal.push("cell-bg-gray");     
    } 
    
    return retVal;

  }
  
}
