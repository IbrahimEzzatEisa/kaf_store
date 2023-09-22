import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AuthRoutingModule } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { AddressListComponent } from '../components/address/address-list/address-list.component';
import { AddressAddComponent } from '../components/address/address-add/address-add.component';
import { PasswordModule } from 'primeng/password';
import { Verfiy_otpComponent } from '../components/verfiy_otp/verfiy_otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

// import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    AddressListComponent,
    AddressAddComponent,
    Verfiy_otpComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    NzCarouselModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    NgOtpInputModule,
    NzRadioModule,
    NzSelectModule,
    NzSwitchModule,
    TranslateModule,
    NzSpinModule,
    GoogleSigninButtonModule



  ],

})
export class AuthModule { }
