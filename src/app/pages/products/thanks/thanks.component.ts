import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {

  // currentLang
  currentLang

  constructor(
    private translate: TranslateService,

  ) {
    this.currentLang = this.translate.currentLang;
  }

  ngOnInit() {
  }

}
