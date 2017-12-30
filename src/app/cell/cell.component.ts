import { Component, OnInit, Input, Output } from '@angular/core';
import { Cell } from '../classes/cell';
//import { Event } from '_debugger';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})

export class CellComponent implements OnInit {
  
  @Input() cell: Cell;
  @Input() @Output() value: number;
  
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
  setValue(value : number, event : MouseEvent) : void {
    if ( event.shiftKey ) {
      console.log("Clearing cells pval: " + value);
      this.removePvalFromCell(value);
    } else {
      console.log("Setting cell value: " + value);
      this.cell.value = value;
      this.cell.pvals = [value];  
    }

  }

    //-------------------------------------------------------------------------------------------
    removePvalFromCell( value ) {
      var x = this.cell.pvals.indexOf(value);
      if (x > -1) {
          this.cell.pvals.splice(x,1);
      }
      // Creates a new array of existing array for change detection
      this.cell.pvals = [].concat(this.cell.pvals);
  }   

  
}
