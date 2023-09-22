import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from '../components/orders/orders.component';
import { AddressListComponent } from '../components/address/address-list/address-list.component';
import { AddressAddComponent } from '../components/address/address-add/address-add.component';
import { RegisterComponent } from '../components/register/register.component';
import { Verfiy_otpComponent } from '../components/verfiy_otp/verfiy_otp.component';
import { LoginComponent } from '../components/login/login.component';


const routes: Routes = [

{
  path: '',
  component: OrdersComponent,
},

{
  path: 'address',
  component: AddressListComponent,
  data:{title:" كــاف / العناوين "}

},
{
  path: 'address-add',
  component: AddressAddComponent,
  data:{title:" كــاف /  !ضافة عنوان "}

},

{
  path: 'address/:id',
  component: AddressAddComponent,
  data:{title:" كــاف / تعديل عنوان "}

},
{
  path: 'register',
  component: RegisterComponent,
  data:{title:" كــاف /إنشاء حساب "}

},
{
  path: 'login',
  component: LoginComponent,
  data:{title:" كــاف / تسجيل الدخول "}

},

{
  path: 'verfiy-otp/:phone',
  component: Verfiy_otpComponent,
  data:{title:" كــاف /كود التحقق "}
},

{
  path: 'verfiy-otp/:phone/:type',
  component: Verfiy_otpComponent,
  data:{title:" كــاف /كود التحقق "}
},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
