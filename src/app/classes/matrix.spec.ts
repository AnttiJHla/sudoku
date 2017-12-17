import {Matrix} from './matrix';
import {Cell} from './cell';
import {CellGroup} from './cellgroup';


describe('Matrix', () => {
    let m : Matrix;
    let matrixVals_l5 : number [] = [
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
            
    beforeEach(()=> {
        m = new Matrix(matrixVals_l5);


    //     this.addMatchers({
    //         toBeArray: function(array) {
    //             this.message = function() {
    //                 return "";
    //             };
    //         var arraysAreSame = function(x, y) {
    //             var arraysAreSame = true;
    //             for(var i; i < x.length; i++)
    //                 if(x[i] !== y[i])
    //                 arraysAreSame = false;
    //             return arraysAreSame;
    //         };
    //         return arraysAreSame(this.actual, array);
    //         }
    //   });
    });

    // Works
    it('when initialized, matrix should contain array of cells',
    () => {
        expect(m.cells[0][0].value).toBe(0);
        expect(m.cells[0][1].value).toBe(1);
        expect(m.cells[1][0].value).toBe(4);
        expect(m.cells[7][8].value).toBe(3);
    });


    it('should have cell groups created',
    () => {


        expect(m.rowGroups[1].cells.length).toBe(9);        
        expect(m.colGroups[1].cells[0].row).toBe(1);        
        expect(m.colGroups[1].cells[0].col).toBe(1);        
        expect(m.rowGroups[1].cells[0].row).toBe(1);        
        expect(m.rowGroups[1].cells[0].col).toBe(1);        
        expect(m.blockGroups[1].cells[0].row).toBe(1);        
        expect(m.blockGroups[1].cells[0].col).toBe(1);

        //expect(m.rowGroups.length).toBe(9);
        //expect(m.colGroups.length).toBe(9);
        //expect(m.blockGroups.length).toBe(9);
        for ( let group = 1; group <= 9; group++ ) {
            let colGrp = m.colGroups[group];
            let rowGrp = m.rowGroups[group];
            let blockGrp = m.blockGroups[group];

            console.log("col group : " + group);
             for ( let i = 0; i < 9; i++ ){
                 // Col group
                 expect(colGrp.cells[i].col).toBe(group);
                 expect(rowGrp.cells[i].row).toBe(group);
             }            
        }
    });

    // Ongoing
    it('should have pvals set after initialization',
    () => {
        m.solve();
        //expect(m.cells[0][0].pvals).not.toMatch(0);
        expect(m.cells[0][0].pvals).not.toContain(1);
        expect(m.cells[0][0].pvals).not.toContain(2);
        expect(m.cells[0][0].pvals).not.toContain(3);
        expect(m.cells[0][0].pvals).not.toContain(4);
        expect(m.cells[0][0].pvals).not.toContain(5);

        let row = 8; 
        let col = 7;
        expect(m.cells[row-1][col-1].pvals).not.toContain(1);
        expect(m.cells[row-1][col-1].pvals).not.toContain(2);
        expect(m.cells[row-1][col-1].pvals).not.toContain(3);
        expect(m.cells[row-1][col-1].pvals).not.toContain(6);
        expect(m.cells[row-1][col-1].pvals).not.toContain(8);

        //expect(m.cells[row-1][col-1].pvals);
    });
    



    

});
