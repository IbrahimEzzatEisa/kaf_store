import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/pages/auth/service/Auth.service';
import { ChangePassword } from '../../models/change-password.model';



@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {


  // from register
  @ViewChild('registerForm') registerForm: NgForm;

  // current user
  chnage_password: ChangePassword = new ChangePassword();

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
    this.chnage_password.email_or_phone = this.route.snapshot.params.email;
  }

  // onSubmitregister
  onSubmitregister() {
    if (this.registerForm.valid) {
      this.isSpinning = true
      this.AuthService.changePassword(this.chnage_password).subscribe(
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


