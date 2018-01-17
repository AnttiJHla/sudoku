import {Blocksolver} from './blocksolver';

describe('Blocksolver', () => {
  it('should create an instance', () => {
    expect(new Blocksolver()).toBeTruthy();
  });
});


// describe('Blockgroup', () => {
//   it('should create an instance', () => {
//     expect(new BlockGroup()).toBeTruthy();
//   });

//   let cg : BlockGroup;
//   beforeEach(()=> {
//       cg = new BlockGroup();
//       // Initializing empty cells
//       for (let i = 0; i < 9; i++) {
//           let cell = new Cell(0,0,0);
//           cg.cells.push(cell);
//       }
//   });


//   it(`solver7 should work as expected`, () => {
//     let cg1 = new BlockGroup();

//     let cell1 = new Cell(0,4,7);
//     let cell2 = new Cell(2,4,8);
//     let cell3 = new Cell(5,4,9);

//     let cell4 = new Cell(8,5,7);
//     let cell5 = new Cell(1,5,8);
//     let cell6 = new Cell(3,5,9);

//     let cell7 = new Cell(4,6,7);
//     let cell8 = new Cell(0,6,8);
//     let cell9 = new Cell(0,6,9);

//     cg1.cells.push(cell1);
//     cg1.cells.push(cell2);
//     cg1.cells.push(cell3);
//     cg1.cells.push(cell4);
//     cg1.cells.push(cell5);
//     cg1.cells.push(cell6);
//     cg1.cells.push(cell7);
//     cg1.cells.push(cell8);
//     cg1.cells.push(cell9);

//     cg1.cells[0].pvals = [7,6];
//     cg1.cells[7].pvals = [7,9];
//     cg1.cells[8].pvals = [9,6];

//     cg1.values.forEach(cg1.solver7, cg1);
    
//     expect(cg1.cells[7].rowValues).toContain(9);
//     expect(cg1.cells[8].rowValues).toContain(9);
//   });


//   it(`should be able to remove pvals from other cols of a block group`, () => {
//     let cg1 = new BlockGroup();

//     let cell1 = new Cell(0,1,1);
//     let cell2 = new Cell(0,1,2);
//     let cell3 = new Cell(0,1,3);

//     let cell4 = new Cell(0,2,1);
//     let cell5 = new Cell(0,2,2);
//     let cell6 = new Cell(0,2,3);

//     let cell7 = new Cell(0,3,1);
//     let cell8 = new Cell(0,3,2);
//     let cell9 = new Cell(0,3,3);

//     cg1.cells.push(cell1);
//     cg1.cells.push(cell2);
//     cg1.cells.push(cell3);
//     cg1.cells.push(cell4);
//     cg1.cells.push(cell5);
//     cg1.cells.push(cell6);
//     cg1.cells.push(cell7);
//     cg1.cells.push(cell8);
//     cg1.cells.push(cell9);

//     cell1.colValues.push(1);

//     cg1.cells.forEach(cg1.solver67_values, cg1);
//     //cg1.cells.forEach(cg1.solver6_col_values, cg1);
//     expect(cg1.cells[1].pvals).not.toContain(1);
//     expect(cg1.cells[2].pvals).not.toContain(1);
//     expect(cg1.cells[4].pvals).not.toContain(1);
//     expect(cg1.cells[5].pvals).not.toContain(1);
//     expect(cg1.cells[7].pvals).not.toContain(1);
//     expect(cg1.cells[8].pvals).not.toContain(1);

//   });

// // Following is related to solver 6
// it(`should be able to remove pvals from other rows of a block group`, () => {
//   let cg1 = new BlockGroup();

//   let cell1 = new Cell(0,1,1);
//   let cell2 = new Cell(0,1,2);
//   let cell3 = new Cell(0,1,3);

//   let cell4 = new Cell(0,2,1);
//   let cell5 = new Cell(0,2,2);
//   let cell6 = new Cell(0,2,3);

//   let cell7 = new Cell(0,3,1);
//   let cell8 = new Cell(0,3,2);
//   let cell9 = new Cell(0,3,3);

//   cg1.cells.push(cell1);
//   cg1.cells.push(cell2);
//   cg1.cells.push(cell3);
//   cg1.cells.push(cell4);
//   cg1.cells.push(cell5);
//   cg1.cells.push(cell6);
//   cg1.cells.push(cell7);
//   cg1.cells.push(cell8);
//   cg1.cells.push(cell9);

//   cell2.rowValues.push(1);
//   cell3.rowValues.push(1);

//   //cg1.cells.forEach(cg1.solver6_row_values, cg1);
//   cg1.cells.forEach(cg1.solver67_values, cg1);
//   expect(cg1.cells[3].pvals).not.toContain(1);
//   expect(cg1.cells[4].pvals).not.toContain(1);
//   expect(cg1.cells[5].pvals).not.toContain(1);
//   expect(cg1.cells[6].pvals).not.toContain(1);
//   expect(cg1.cells[7].pvals).not.toContain(1);
//   expect(cg1.cells[8].pvals).not.toContain(1);


// });


// });
