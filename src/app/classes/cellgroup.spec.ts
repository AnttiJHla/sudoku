import {CellGroup} from './cellgroup';
import {Cell} from './cell';

describe('CellGroup', () => {
    let cg : CellGroup;
    beforeEach(()=> {
        cg = new CellGroup();
        // Initializing empty cells
        for (let i = 0; i < 9; i++) {
            let cell = new Cell(0,0,0);
            cg.cells.push(cell);
        }
    });


    it('when initialized, cell group should contain 9 cells',
    () => {
        expect(cg.cells.length).toBe(9);
    });


    it(`When any of the cells has a defined value, 
    other cells should not have that value in pvals`, () => {
        let cell1 = new Cell(1,0,0);        
        cg.cells[0]=cell1;
        cg.cells.forEach(cg.solver1, cg);
        for (let i = 1; i < 9; i ++){
            expect(cg.cells[i].pvals).not.toContain(1);
        }
    });

    it(`should have solver2 working as expected`, () => {
        let cg1 = new CellGroup();
        // Initializing empty cells
        for (let i = 0; i<9; i++) {
            let cell = new Cell(0,0,0);
            cg1.cells.push(cell);
        }
        
        cg1.cells[0].pvals = [1,7];
        cg1.cells[1].pvals = [1,7];
        cg1.cells.forEach(cg1.solver2, cg1);
        for (let i = 2; i < 9; i ++){
            expect(cg1.cells[i].pvals).not.toContain(1);
            expect(cg1.cells[i].pvals).not.toContain(7);
        }
    });

    it(`should have solver3 working as expected`, () => {
        let cg1 = new CellGroup();
        // Initializing empty cells
        for (let i = 0; i<9; i++) {
            let cell = new Cell(0,0,0);
            cg1.cells.push(cell);
        }
        
        cg1.cells[0].pvals = [1,2,7];
        cg1.cells[1].pvals = [1,2,7];
        cg1.cells[2].pvals = [1,2,7];
        //cg1.solver3();
        cg1.cells.forEach(cg1.solver3, cg1);
        for (let i = 3; i < 9; i ++){
            expect(cg1.cells[i].pvals).not.toContain(1);
            expect(cg1.cells[i].pvals).not.toContain(2);
            expect(cg1.cells[i].pvals).not.toContain(7);
        }
    });
    it(`solver4 should work as expected`, () => {
        let cg1 = new CellGroup();
        // Initializing empty cells
        for (let i = 1; i<=6; i++) {
            let cell = new Cell(i,0,0);
            cg1.cells.push(cell);
        }
        for (let i = 7; i<=9; i++) {
            let cell = new Cell(0,0,0);
            cg1.cells.push(cell);
        }
        
        cg1.cells[6].pvals = [7,8,9];
        cg1.cells[7].pvals = [8,9];
        cg1.cells[8].pvals = [8,9];

        cg1.values.forEach(cg1.solver4, cg1);

        expect(cg1.cells[6].pvals).not.toContain(8);
        expect(cg1.cells[6].pvals).not.toContain(9);
    });

    it(`solver5 should work as expected`, () => {
        // Two values in two cells improved
        let cg1 = new CellGroup();
        // Initializing empty cells
        for (let i = 1; i<=9; i++) {
            let cell = new Cell(0,0,0);
            cg1.cells.push(cell);
        }
        cg1.cells[0].value = 9;
        cg1.cells[1].value = 1;
        cg1.cells[3].value = 4;
        cg1.cells[8].value = 3;

        cg1.cells[0].pvals = [9];
        cg1.cells[1].pvals = [1];
        cg1.cells[2].pvals = [7,8];
        cg1.cells[3].pvals = [4];
        cg1.cells[4].pvals = [5,7,8];
        cg1.cells[5].pvals = [5,7,8];
        cg1.cells[6].pvals = [2,6,8];
        cg1.cells[7].pvals = [2,5,6,8];
        cg1.cells[8].pvals = [3];
        
        
        cg1.solver5();

        expect(cg1.cells[7].pvals).not.toContain(5);
        expect(cg1.cells[7].pvals).not.toContain(8);
        expect(cg1.cells[6].pvals).toContain(2);
        expect(cg1.cells[6].pvals).toContain(6);
        expect(cg1.cells[7].pvals).toContain(2);
        expect(cg1.cells[7].pvals).toContain(6);
    });

    it(`solver6 should work as expected`, () => {
        // Two values in two cells improved
        let cg1 = new CellGroup();
        // Initializing empty cells
        for (let i = 1; i<=9; i++) {
            let cell = new Cell(0,1,i);
            cg1.cells.push(cell);
        }

        cg1.cells[0].value = 4;
        cg1.cells[3].value = 8;
        cg1.cells[5].value = 6;
        cg1.cells[8].value = 7;

        cg1.cells[0].pvals = [4];
        cg1.cells[1].pvals = [1,2,3,5];
        cg1.cells[2].pvals = [1,2];
        cg1.cells[3].pvals = [8];
        cg1.cells[4].pvals = [2,9];
        cg1.cells[5].pvals = [6];
        cg1.cells[6].pvals = [3,5,9];
        cg1.cells[7].pvals = [3,5,9];
        cg1.cells[8].pvals = [7];

        cg1.values.forEach(cg1.solver6, cg1);
        
        expect(cg1.isRowGroup()).toBe(true);

        expect(cg1.cells[1].rowValues).toContain(1);
        expect(cg1.cells[2].rowValues).toContain(1);
        
        
    });

    it(`should be able to remove pvals from other rows of a block group`, () => {
        let cg1 = new CellGroup();
        let cells1 : Cell [] = [];

        let cell1 = new Cell(0,1,1);
        let cell2 = new Cell(0,1,2);
        let cell3 = new Cell(0,1,3);

        let cell4 = new Cell(0,2,1);
        let cell5 = new Cell(0,2,2);
        let cell6 = new Cell(0,2,3);

        let cell7 = new Cell(0,3,1);
        let cell8 = new Cell(0,3,2);
        let cell9 = new Cell(0,3,3);

        cg1.cells.push(cell1);
        cg1.cells.push(cell2);
        cg1.cells.push(cell3);
        cg1.cells.push(cell4);
        cg1.cells.push(cell5);
        cg1.cells.push(cell6);
        cg1.cells.push(cell7);
        cg1.cells.push(cell8);
        cg1.cells.push(cell9);

        cell2.rowValues.push(1);
        cell3.rowValues.push(1);

        cg1.cells.forEach(cg1.solver7_row_values, cg1);
        expect(cg1.cells[3].pvals).not.toContain(1);
        expect(cg1.cells[4].pvals).not.toContain(1);
        expect(cg1.cells[5].pvals).not.toContain(1);
        expect(cg1.cells[6].pvals).not.toContain(1);
        expect(cg1.cells[7].pvals).not.toContain(1);
        expect(cg1.cells[8].pvals).not.toContain(1);


    });
    it(`should be able to remove pvals from other cols of a block group`, () => {
        let cg1 = new CellGroup();
        let cells1 : Cell [] = [];

        let cell1 = new Cell(0,1,1);
        let cell2 = new Cell(0,1,2);
        let cell3 = new Cell(0,1,3);

        let cell4 = new Cell(0,2,1);
        let cell5 = new Cell(0,2,2);
        let cell6 = new Cell(0,2,3);

        let cell7 = new Cell(0,3,1);
        let cell8 = new Cell(0,3,2);
        let cell9 = new Cell(0,3,3);

        cg1.cells.push(cell1);
        cg1.cells.push(cell2);
        cg1.cells.push(cell3);
        cg1.cells.push(cell4);
        cg1.cells.push(cell5);
        cg1.cells.push(cell6);
        cg1.cells.push(cell7);
        cg1.cells.push(cell8);
        cg1.cells.push(cell9);

        cell1.colValues.push(1);

        cg1.cells.forEach(cg1.solver7_col_values, cg1);
        expect(cg1.cells[1].pvals).not.toContain(1);
        expect(cg1.cells[2].pvals).not.toContain(1);
        expect(cg1.cells[4].pvals).not.toContain(1);
        expect(cg1.cells[5].pvals).not.toContain(1);
        expect(cg1.cells[7].pvals).not.toContain(1);
        expect(cg1.cells[8].pvals).not.toContain(1);

    });

    it(`should be able to check block group of cell`, () => {
        // Two values in two cells improved
        let cg1 = new CellGroup();

        let cell1 = new Cell(0,1,1);
        let cell2 = new Cell(0,1,2);
        let cell3 = new Cell(0,9,9);

        expect(cg1.getBlockGroupOfCell(cell1)).toBe(1);       
        expect(cg1.getBlockGroupOfCell(cell2)).toBe(1);       
        expect(cg1.getBlockGroupOfCell(cell3)).toBe(9);       
    });

    it(`should be able to check if cells are in same block`, () => {
        // Two values in two cells improved
        let cg1 = new CellGroup();
        let cells1 : Cell [] = [];

        let cell1 = new Cell(0,1,1);
        let cell2 = new Cell(0,1,2);
        let cell3 = new Cell(0,9,9);

        cells1.push(cell1);
        cells1.push(cell2);

        expect(cg1.allCellsInSameBlock(cells1)).toBe(true);       
    });

    it(`should be able to check if cells are in different block`, () => {
        // Two values in two cells improved
        let cg1 = new CellGroup();
        let cells2 : Cell [] = [];

        let cell1 = new Cell(0,1,1);
        let cell3 = new Cell(0,9,9);


        cells2.push(cell1);
        cells2.push(cell3);

        expect(cg1.allCellsInSameBlock(cells2)).toBe(false);       
        
    });

    

});
