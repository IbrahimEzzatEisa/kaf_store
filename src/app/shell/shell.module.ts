import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { PasswordModule } from 'primeng/password';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TranslateModule } from '@ngx-translate/core';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NzInputModule,
    NzCheckboxModule,
    PasswordModule,
    OverlayPanelModule ,
    GoogleSigninButtonModule,
    NzSpinModule,
    TranslateModule,
    NzMessageModule

  ],

  exports: [
    NavbarComponent,
    FooterComponent,
  ],


})

export class ShellModule { }
