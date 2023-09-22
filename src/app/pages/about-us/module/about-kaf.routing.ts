import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from '../components/about-us.component';


const routes: Routes = [
  {
  path: '',
  component: AboutUsComponent,
  data:{title:" كــاف / من نحن"}
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutKafRoutingModule { }
