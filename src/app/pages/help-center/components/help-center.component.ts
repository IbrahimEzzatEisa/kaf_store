import { Component, OnInit } from '@angular/core';
import { About } from '../../home/models/about.model';
import { HomeService } from '../../home/service/sections.service';
import { SubscriptionService } from 'src/app/shell/services/subscription.service';
import { TranslateService } from '@ngx-translate/core';
import { HelpCenter } from '../models/helpCenter.model';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']

})
export class HelpCenterComponent implements OnInit {

  // page load
  isSpinning: boolean;

  // currentLang
  currentLang

 // main array
  help_Center:HelpCenter []= []

 // inject
  constructor(
    private subscription_Service: SubscriptionService,
    private translate: TranslateService,
  ) {
    // default lang
    this.currentLang = this.translate.currentLang;
  }

  // call msin function
  ngOnInit() {
    this.isSpinning = true
    this.subscription_Service.getcommon_questions().subscribe(
      res => {
        this.help_Center = res;
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )
  }

}
