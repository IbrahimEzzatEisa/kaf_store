import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from '../../model/login.model';
import { NgForm } from '@angular/forms';
import { SubscriptionService } from 'src/app/shell/services/subscription.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/service/Auth.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { TranslateService } from '@ngx-translate/core';
import { LoginSoical } from 'src/app/shell/model/soical_login.model';
import { CurrentUser } from 'src/app/shell/model/current_user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // main object
  login: Login = new Login()

  // page load
  isSpinning: boolean;

  // default lang
  currentLang

  @ViewChild('FinsihForm') FinsihForm: NgForm;
  @ViewChild('registerForm') registerForm: NgForm;

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
    private authService: SocialAuthService,
    private translate: TranslateService,
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

  // login
  onSubmitFinish() {
    if (this.FinsihForm.valid) {
      this.isSpinning = true
      this.AuthService.loginUser(this.login).subscribe(
        res => {
          localStorage.setItem('Kaf-token', String(res.auth_data.access_token))
          localStorage.setItem('Kaf-user', JSON.stringify(res))
          this.router.navigate([`/product`])
          setTimeout(() => {
            window.location.reload()

          }, 1000);
          this.isSpinning = false
        }, err => {
          this.isSpinning = false
        }
      )
    }
  }

  // register page
  openRegister() {
    this.router.navigate([`/auth/register`])

  }

}
