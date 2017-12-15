import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatrixComponent } from './matrix/matrix.component';
const routes: Routes = [
    { path: '', redirectTo: '/matrix', pathMatch: 'full' },
    { path: 'matrix',  component: MatrixComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
