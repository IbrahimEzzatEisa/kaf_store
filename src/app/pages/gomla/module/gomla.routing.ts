import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GomlaComponent } from '../components/gomla/gomla.component';


const routes: Routes = [
  {
  path: '',
  component: GomlaComponent,
  data:{title:" كــاف / قسم الجملة "}

},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GomlaRoutingModule { }
