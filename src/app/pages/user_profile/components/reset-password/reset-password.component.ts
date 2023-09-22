import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangePassword } from '../../models/change-password.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/service/Auth.service';
import { TranslateService } from '@ngx-translate/core';
import { NewPassword } from '../../models/newPassword.model';




@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  // from register
  @ViewChild('registerForm') registerForm: NgForm;

  // current user
  chnage_password: NewPassword = new NewPassword();

  // current lang
  currentLang = '';

  // page load
  isSpinning: boolean;

  // inject
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {

    // default lang
    this.currentLang = this.translate.currentLang;

  }

  ngOnInit() {
  }

  // onSubmitregister
  onSubmitregister() {
    if (this.registerForm.valid) {
      this.isSpinning = true
      this.AuthService.changeNewPassword(this.chnage_password).subscribe(
        res => {
          this.isSpinning = false;
          this.router.navigate([`/user/profile`])
        }, err => {
          this.isSpinning = false
        }
      )
    }
  }


}
