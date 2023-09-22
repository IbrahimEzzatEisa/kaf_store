import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsConditionsComponent } from '../terms-conditions.component';


const routes: Routes = [

{
  path: '',
  component: TermsConditionsComponent,
  data:{title:" كــاف / الشروط والأحكام"}
},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsRoutingModule { }
