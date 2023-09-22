import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // url payment
  url: SafeResourceUrl | any;

  // currentLang
  currentLang

  // injct
  constructor(
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private route:ActivatedRoute
  ) {
    // default lang
    this.currentLang = this.translate.currentLang;
  }


  ngOnInit() {

    // get url
    this.route.params.subscribe(params => {
      const dataUrl = params['dataUrl'];
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://payments.urway-tech.com/URWAYPGService/direct.jsp?paymentid="+dataUrl);
    });


  }

}
