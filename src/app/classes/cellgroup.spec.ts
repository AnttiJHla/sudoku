import {CellGroup} from './cellgroup';
import {Cell} from './cell';

describe('CellGroup', () => {
    let cg : CellGroup;
    beforeEach(()=> {
        cg = new CellGroup();
        // Initializing empty cells
        for (let i = 0; i<9; i++) {
            let cell = new Cell(0);
            cg.cells.push(cell);
        }
    });


    it('when initialized, cell group should contain 9 cells',
    () => {
        expect(cg.cells.length).toBe(9);
    });


    it(`When any of the cells has a defined value, 
    other cells should not have that value in pvals`, () => {
        let cell1 = new Cell(1);        
        cg.cells[0]=cell1;
        cg.solve();
        for (let i = 1; i < 9; i ++){
            expect(cg.cells[i].pvals).not.toContain(1);
        }
    });

    it(`should have solver2 working as expected`, () => {
        let cg1 = new CellGroup();
        // Initializing empty cells
        for (let i = 0; i<9; i++) {
            let cell = new Cell(0);
            cg1.cells.push(cell);
        }
        
        cg1.cells[0].pvals = [1,7];
        cg1.cells[1].pvals = [1,7];
        cg1.solve();
        for (let i = 2; i < 9; i ++){
            expect(cg1.cells[i].pvals).not.toContain(1);
            expect(cg1.cells[i].pvals).not.toContain(7);
        }
    });
    it(`should have solver3 working as expected`, () => {
        let cg1 = new CellGroup();
        // Initializing empty cells
        for (let i = 0; i<9; i++) {
            let cell = new Cell(0);
            cg1.cells.push(cell);
        }
        
        cg1.cells[0].pvals = [1,2,7];
        cg1.cells[1].pvals = [1,2,7];
        cg1.cells[2].pvals = [1,2,7];
        cg1.solve();
        for (let i = 3; i < 9; i ++){
            expect(cg1.cells[i].pvals).not.toContain(1);
            expect(cg1.cells[i].pvals).not.toContain(2);
            expect(cg1.cells[i].pvals).not.toContain(7);
        }
    });
    

});
