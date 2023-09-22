import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/sections.service';
import { Slider } from '../models/slider.model';
import { About } from '../models/about.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // main array
  slider: Slider[] = [];

  // main object store_banner
  store_banner: Slider = new Slider();

  // main array
  about: About = new About()

  // langauage
  currentLang: string = '';
  language

  constructor(private homeService: HomeService,
    private translate: TranslateService,

    ) {
      this.currentLang = this.translate.currentLang;

    }

  ngOnInit() {

    this.homeService.getSlider().subscribe(
      res => {
        this.slider = res
      }
    )

    this.homeService.getAbout().subscribe(
      res => {
        this.about = res
      }, err => {
      }
    )

    this.homeService.getstore_banner().subscribe(
      res => {
        this.store_banner.image = res.image;
      }
    )

  }


 // link
  HREF(link){
    window.open(link, "_blank");

  }

}
