import { Component, OnInit, ViewChild } from '@angular/core';
import { About } from '../../home/models/about.model';
import { HomeService } from '../../home/service/sections.service';
import { SubscriptionService } from 'src/app/shell/services/subscription.service';
import { TranslateService } from '@ngx-translate/core';
import { HelpCenter } from '../models/helpCenter.model';
import { WebsiteConfig } from 'src/app/shell/model/website_config.model';
import { NgForm } from '@angular/forms';
import { Gomla } from '../../gomla/models/gomla.model';
import { ContactUs } from '../models/contact-us.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
})
export class ContactUSComponent implements OnInit {

  @ViewChild('gomlaForm') gomlaForm?: NgForm;

  // main object
  gomla_obj: ContactUs = new ContactUs()

  // currentLang
  currentLang

  // page load
  isSpinning: boolean;

  // website links
  site_config: WebsiteConfig = new WebsiteConfig();

  // message;
  messageText = '';
  // inject
  constructor(
    private subscription_Service: SubscriptionService,
    private translate: TranslateService,
  ) {
    // default lang
    this.currentLang = this.translate.currentLang;

  }


  ngOnInit() {
    this.site_config = JSON.parse(localStorage.getItem('config') || '');

  }

  // submit form
  onSubmitFinish() {
    if (this.gomlaForm?.valid) {
      this.isSpinning = true
      this.subscription_Service.contact_us(this.gomla_obj).subscribe(
        res => {
          this.gomlaForm?.resetForm();
          this.isSpinning = false;
          if (this.currentLang == 'ar') {
            this.messageText = 'تم إرسال طلبكم بنجاح .. شكرا لكم ';
          } else {
            this.messageText = 'Your request has been sent successfully. Thank you';

          }
          setTimeout(() => {
            this.messageText = '';
          }, 3000);

        }, err => {
          this.isSpinning = false

        }
      )

    }
  }

}


