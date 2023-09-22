import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CurrentUser } from 'src/app/shell/model/current_user.model';
import { AuthService } from 'src/app/pages/auth/service/Auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  // from register
  @ViewChild('registerForm') registerForm: NgForm;
  @ViewChild('FinsihForm') FinsihForm: NgForm;

  // current user
  current_user: CurrentUser = new CurrentUser();
  // current lang
  currentLang = '';

  // page load
  isSpinning: boolean;

  // inject
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private translate: TranslateService,
  ) {

    // default lang
    this.currentLang = this.translate.currentLang;

  }

  ngOnInit() {

    this.view_profile()

  }
  // onSubmitregister
  view_profile() {
    this.isSpinning = true
    this.AuthService.get_profile().subscribe(
      res => {
        this.current_user = res
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )


  }


  // onSubmitregister
  onSubmitregister() {
    if (this.registerForm.valid) {
      this.isSpinning = true
      this.AuthService.Edit_profile(this.current_user).subscribe(
        res => {
          this.isSpinning = false
        }, err => {
          this.isSpinning = false
        }
      )
    }

  }

  // login
  login() {
    this.router.navigate([`/user/change-password`])
  }

  // check otp
  OTP() {
    this.isSpinning = true
    this.AuthService.forgetPassword(this.current_user.email).subscribe(
      res => {
        this.isSpinning = false;
        let data = 'not_google'
        this.router.navigate([`/auth/verfiy-otp/${this.current_user.email}/${data}`])
      }, err => {
        this.isSpinning = false
      }
    )
  }


}
