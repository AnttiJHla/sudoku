# Sudoku

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Todo items:

  - Solver should have final step where single pval is activated
    - next step should be to go thru each cell grp and remove pval from those
  
  - Add possibility to undo/redo latest action for full matrix	---

  - Cell tracker should store cell state not cell itself...
    cell is a reference to cell itself in cells[][]		---

  - Could have a console reporting progress on each solver execution ---

  - Move cellgroup test cases to respective solvers		---
    - Remove cellgroup block/row/col specs when done		--
  - Each solver function should have own test case		---

 - Use animations when solving the matrix			---

 - Solver 8: If 1-3 values on this line of a block only, 
    those pvals can be cleaned up from other cells of linegroup
 
    - Undo functionality for manual solving of the matrix
      - all steps should be possible to revert

    - Selecting a pval should trigger solver for 3 cell groups
      to remove that value from other cells in those groups	--

 - Create a new matrix by moving cursor over cell + entering a value
 
