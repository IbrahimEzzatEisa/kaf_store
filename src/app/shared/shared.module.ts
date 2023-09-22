import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationsComponent } from './components/pagination/paginations.component';



@NgModule({
  declarations: [
    PaginationsComponent
  ],

  imports: [
    CommonModule,

  ],

  exports: [
    PaginationsComponent
  ]

})
export class SharedModule { }
