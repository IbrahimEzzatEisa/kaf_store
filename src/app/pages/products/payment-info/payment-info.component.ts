import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentParmas } from '../models/paymentParmas.model';
import { ProdcutsService } from '../service/products.service';
import { CheckStatus } from '../models/check_status.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']

})
export class PaymentInfoComponent implements OnInit {

  // main object of url
  paymentParmas: PaymentParmas = new PaymentParmas();

  // check
  error: boolean;

  // check status
  check_Status: CheckStatus = new CheckStatus()

  // currentLang
  currentLang

  constructor(
    private route: ActivatedRoute,
    private pakageServices: ProdcutsService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,

  ) {
    // default lang
    this.currentLang = this.translate.currentLang;
  }

  ngOnInit() {

    this.spinner.show();
    this.paymentParmas.AuthCode = this.route.snapshot.queryParams.AuthCode;
    this.paymentParmas.PaymentId = this.route.snapshot.queryParams.PaymentId
    this.paymentParmas.PaymentType = this.route.snapshot.queryParams.PaymentType
    this.paymentParmas.ECI = this.route.snapshot.queryParams.ECI
    this.paymentParmas.RRN = this.route.snapshot.queryParams.RRN
    this.paymentParmas.ResponseCode = this.route.snapshot.queryParams.ResponseCode;
    this.paymentParmas.Result = this.route.snapshot.queryParams.Result;
    this.paymentParmas.SubscriptionId = this.route.snapshot.queryParams.SubscriptionId;
    this.paymentParmas.TrackId = this.route.snapshot.queryParams.TrackId;
    this.paymentParmas.TranId = this.route.snapshot.queryParams.TranId
    this.paymentParmas.UserField1 = this.route.snapshot.queryParams.UserField1
    this.paymentParmas.UserField3 = this.route.snapshot.queryParams.UserField3
    this.paymentParmas.UserField4 = this.route.snapshot.queryParams.UserField4
    this.paymentParmas.UserField5 = this.route.snapshot.queryParams.UserField5
    this.paymentParmas.amount = this.route.snapshot.queryParams.amount;
    this.paymentParmas.cardBrand = this.route.snapshot.queryParams.cardBrand
    this.paymentParmas.cardToken = this.route.snapshot.queryParams.cardToken
    this.paymentParmas.email = this.route.snapshot.queryParams.email
    this.paymentParmas.maskedPAN = this.route.snapshot.queryParams.maskedPAN
    this.paymentParmas.metaData = this.route.snapshot.queryParams.metaData
    this.paymentParmas.payFor = this.route.snapshot.queryParams.payFor
    this.paymentParmas.responseHash = this.route.snapshot.queryParams.responseHash
    this.pakageServices.BuyVisa(this.paymentParmas).subscribe(
      res => {

        this.check_Status = res

        if (this.check_Status != null) {
          this.error = false
          this.check_Status = res
        } else {
          this.error = true
        }
        this.spinner.hide();
        localStorage.removeItem('url_payment')
      }, err => {
        this.spinner.hide()
        localStorage.removeItem('url_payment')

      }
    )
  }


}
