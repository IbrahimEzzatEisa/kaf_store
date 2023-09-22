import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../component/home.component';


const routes: Routes = [
  {
  path: '',
  component: HomeComponent,
  data:{title:" كــاف / الصفحة الرئيسية"}
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
