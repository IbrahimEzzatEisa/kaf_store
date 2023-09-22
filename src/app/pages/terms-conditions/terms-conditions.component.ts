import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WebsiteConfig } from 'src/app/shell/model/website_config.model';
import { HomeService } from '../home/service/sections.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit {

  // website links
  site_config: WebsiteConfig = new WebsiteConfig();

  // currentLang
  currentLang

  // page load
  isSpinning: boolean;

   // content
   terms_and_conditions

  constructor(
   private translate: TranslateService,
   private homeService: HomeService

  ) {
    // default lang
    this.currentLang = this.translate.currentLang;
  }

  ngOnInit() {

    this.homeService.getTerms().subscribe(
      res => {
        this.terms_and_conditions = res.content

      }, err => {
      }
    )

  }

}


