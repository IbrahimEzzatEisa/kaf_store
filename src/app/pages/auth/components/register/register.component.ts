import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Register } from '../../model/register.model';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shell/services/subscription.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/pages/auth/service/Auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginSoical } from 'src/app/shell/model/soical_login.model';
import { CurrentUser } from 'src/app/shell/model/current_user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // from register
  @ViewChild('registerForm') registerForm: NgForm;
  @ViewChild('FinsihForm') FinsihForm: NgForm;

  // main object of Register
  register: Register = new Register()

  // current lang
  currentLang = '';

  // page load
  isSpinning: boolean;


  socialUser!: SocialUser;

  x: string | undefined;
  message: any;
  email: string;
  name: string;
  token: string;

  // login
  login_soical: LoginSoical = new LoginSoical();

    // current user
    current_user: CurrentUser = new CurrentUser();


  // inject
  constructor(
    private router: Router,
    private subscription_Service: SubscriptionService,
    private AuthService: AuthService,
    private translate: TranslateService,
    private authService: SocialAuthService
  ) {

    // default lang
    this.currentLang = this.translate.currentLang;

  }

  ngOnInit() {

    this.current_user = JSON.parse(localStorage.getItem('Kaf-user') || '[]');


    if(this.current_user.name){
      this.router.navigate([`/home`])

    }
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.login_soical.email = this.socialUser.email;
      this.login_soical.name = this.socialUser.name;
      this.login_soical.token = this.socialUser.idToken;
      this.AuthService.loginUserGoogle(this.login_soical).subscribe((res: any) => {
        localStorage.setItem('Kaf-token', String(res.auth_data.access_token))
        localStorage.setItem('Kaf-user', JSON.stringify(res))
        this.x = res.message;
        this.message = res.errors;
        const phoneNumber = res.phone;
        if (phoneNumber.trim() === '') {
          let data = 'google'
          this.router.navigate([`/auth/verfiy-otp/${res.email}/${data}`])
        } else {
          window.location.assign(`/home`)

        }
      })
    });

  }

  // onSubmitregister
  onSubmitregister() {
    if (this.registerForm.valid) {
      this.isSpinning = true
      this.register.phone = Number(this.register.phone)
      this.AuthService.register(this.register).subscribe(
        res => {
          this.registerForm.resetForm();
          this.openAuth(res.user.phone);
          this.isSpinning = false

        }, err => {
          this.isSpinning = false

        }
      )
    }

  }

  // otp verfity
  openAuth(phone) {
    this.router.navigate([`/auth/verfiy-otp/${phone}`])

  }

  // login
  login() {
    this.router.navigate([`/auth/login`])

  }
}
