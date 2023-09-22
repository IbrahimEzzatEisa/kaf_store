import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from '../components/orders/orders.component';
import { UserComponent } from '../components/user/user.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from '../components/forget-password/forget-password.component';
import { TrackOrderComponent } from '../components/track-order/track-order.component';
import { PointsComponent } from '../components/points/points.component';
import { WishesListComponent } from '../../products/wishes-list/wishes-list.component';


const routes: Routes = [
  {
  path: 'orders',
  component: OrdersComponent,
  data:{title:" كــاف / طلباتي"}
},

{
  path: 'profile',
  component: UserComponent,
  data:{title:" كــاف / الملف الشخصي"}
},

{
  path: 'change-password',
  component: ResetPasswordComponent,
  data:{title:" كــاف /  تغيير كلمة المرور"}
},
{
  path: 'whishlist',
  component: WishesListComponent,
  data:{title:" كــاف /  المفضلة "}
},


{
  path: 'reset-password/:email',
  component: ForgetPasswordComponent,
  data:{title:" كــاف / إستعادة كلمة المرور "}
},
{
  path: 'track/:id',
  component: TrackOrderComponent,
  data:{title:" كــاف / تتبع الشحنة  "}
},

{
  path: 'points',
  component: PointsComponent,
  data:{title:" كــاف /  النقاط"}
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserKafRoutingModule { }
