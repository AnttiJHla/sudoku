import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatrixComponent } from './matrix/matrix.component';
import { CellComponent } from './cell/cell.component';
const routes: Routes = [
    { path: '', redirectTo: '/matrix', pathMatch: 'full' },
    { path: 'matrix',  component: MatrixComponent },
    { path: 'cell',  component: CellComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
