import {Cell} from '../classes/cell';
import { Solver } from '../classes/solver';
import { Changetracker } from '../classes/changetracker';

export class CellGroup {
    cells : Cell [] = [];
    solver : Solver;
    tracker : Changetracker;
    changed : boolean = true;

    pvalsLength : number = 0;
    rowValsLength : number = 0;
    colValsLength : number = 0;

    // Dummy array to be used to replace for loops...
    values = [1,2,3,4,5,6,7,8,9];
    
    constructor( solver : Solver, tracker : Changetracker )
    {
        this.solver = solver;
        this.tracker = tracker;
    }    

    //---------------------------------------------
    solve () {
        //if ( this.changed ) 
            this.solver.solve( this );
    }
    //---------------------------------------------
    trackchanges () {
        this.tracker.trackChanges( this );
    }

}
