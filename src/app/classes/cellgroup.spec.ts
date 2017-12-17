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
        cg.solver1();
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
        cg1.solver2();
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
        cg1.solver3();
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
        cg1.solver4();
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

    

});
