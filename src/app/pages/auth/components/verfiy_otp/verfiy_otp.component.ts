import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OTPVerification } from '../../model/otp.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/Auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verfiy_otp',
  templateUrl: './verfiy_otp.component.html',
  styleUrls: ['./verfiy_otp.component.css']
})
export class Verfiy_otpComponent implements OnInit {


  // main objecg
  oTP_Verification: OTPVerification = new OTPVerification()
  // form
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  @ViewChild('PartnerOtp') PartnerOtp: NgForm;

  // otp
  otpNumber: any;

  // otp number
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '70px',
      'height': '70px'
    }
  };

  // page load
  isSpinning: boolean = false

  // currentLang
  currentLang = ''

  // inject
  constructor(
    private route: ActivatedRoute,
    private veifiy_code_service: AuthService,
    private router: Router,
    private translate: TranslateService,
  ) {

    // default lang
    this.currentLang = this.translate.currentLang;

  }

  ngOnInit() {
    // phone number
    this.oTP_Verification.email_or_phone = this.route.snapshot.params.phone;
  }


  // submit
  onSubmitpartner() {

  }

  // check otp and go to login page
  login() {
    if (this.oTP_Verification.verification_code.length == 4) {
      this.isSpinning = true
      this.veifiy_code_service.veifiy_code(this.oTP_Verification).subscribe(
        res => {
          if (this.route.snapshot.params.type == 'not_google') {
            this.router.navigate([`/user/reset-password/${this.oTP_Verification.email_or_phone}`])
          }
          else if (this.route.snapshot.params.type == 'google') {
            this.router.navigate([`/user/profile`])
          }
          else {
            this.router.navigate([`/auth/login`])
          }
          this.isSpinning = false
        }, err => {
          this.isSpinning = false

        }
      )
    }
  }


  // data entry otp
  onOtpChange(otp: any) {
    this.otpNumber = otp;
    this.oTP_Verification.verification_code = String(this.otpNumber);
  }


  // send code
  sendCode() {
    this.isSpinning = true
    this.veifiy_code_service.get_veifiy_code(this.oTP_Verification.email_or_phone).subscribe(
      res => {
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )
  }



}
