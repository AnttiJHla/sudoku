import {Rowsolver} from './rowsolver';

describe('Rowsolver', () => {
  it('should create an instance', () => {
    expect(new Rowsolver()).toBeTruthy();
  });
});

// import { RowGroup } from './rowgroup';
// import { Cell } from './cell';

// describe('Rowgroup', () => {

//   it(`solver6 should work as expected`, () => {
//     // Two values in two cells improved
//     let cg1 = new RowGroup();
//     // Initializing empty cells
//     for (let i = 1; i<=9; i++) {
//         let cell = new Cell(0,i,1);
//         cg1.cells.push(cell);
//     }

//     cg1.cells[0].value = 4;
//     cg1.cells[3].value = 8;
//     cg1.cells[5].value = 6;
//     cg1.cells[8].value = 7;

//     cg1.cells[0].pvals = [4];
//     cg1.cells[1].pvals = [1,2,3,5];
//     cg1.cells[2].pvals = [1,2];
//     cg1.cells[3].pvals = [8];
//     cg1.cells[4].pvals = [2,9];
//     cg1.cells[5].pvals = [6];
//     cg1.cells[6].pvals = [3,5,9];
//     cg1.cells[7].pvals = [3,5,9];
//     cg1.cells[8].pvals = [7];

//     cg1.values.forEach(cg1.solver6, cg1);
    
//     expect(cg1.cells[1].rowValues).toContain(1);
//     expect(cg1.cells[2].rowValues).toContain(1);
    
//   });

//   // Note: a test case is missing for removing row values from other blocks of
//   // this group


// });
