import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUSComponent } from '../components/contact-us.component';


const routes: Routes = [
  {
  path: '',
  component: ContactUSComponent,
  data:{title:" كــاف / تواصل معنا "}


},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUSRoutingModule { }
