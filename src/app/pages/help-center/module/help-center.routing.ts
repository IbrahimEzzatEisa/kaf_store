import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpCenterComponent } from '../components/help-center.component';


const routes: Routes = [
  {
  path: '',
  component: HelpCenterComponent,
  data:{title:" كــاف / مركز المساعدة "}
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpCenterRoutingModule { }
