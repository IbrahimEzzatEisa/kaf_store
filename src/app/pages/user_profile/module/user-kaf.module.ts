import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UserKafRoutingModule } from './user-kaf.routing';
import { OrdersComponent } from '../components/orders/orders.component';
import { UserComponent } from '../components/user/user.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { SplitterModule } from 'primeng/splitter';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from '../components/forget-password/forget-password.component';
import { TrackOrderComponent } from '../components/track-order/track-order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PointsComponent } from '../components/points/points.component';
import { WishesListComponent } from '../../products/wishes-list/wishes-list.component';



@NgModule({

  declarations: [
    OrdersComponent,
    UserComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    TrackOrderComponent,
    PointsComponent,
    WishesListComponent ,


  ],

  imports: [
    CommonModule,
    UserKafRoutingModule,
    RouterModule,
    NzCarouselModule,
    CarouselModule,
    NzMessageModule,
    NzSpinModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    SharedModule

  ],

})
export class UserKAfModule { }
