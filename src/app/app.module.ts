import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatrixComponent } from './matrix/matrix.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MatrixComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
