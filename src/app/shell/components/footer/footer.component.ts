import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/pages/home/service/sections.service';
import { PointBanner } from '../../model/banner-point.model';
import { TranslateService } from '@ngx-translate/core';
import { WebsiteConfig } from '../../model/website_config.model';
import { Soical } from '../../model/soical.model';
import { Subscribe } from 'src/app/pages/home/models/subscribe.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // main object
  point_banner: PointBanner = new PointBanner()

  // langauage
  currentLang: string = '';
  language

  // website links
  site_config: WebsiteConfig = new WebsiteConfig();

  // list of links
  soical: Soical[] = []
  soical_obj: Soical = new Soical()

  // soical media
  twitter;
  insta;
  linked;

  // main object
  subscribe_data: Subscribe = new Subscribe()

  // message;
  message_text: string

  // show point
  Show_point;


  // inject
  constructor(
    private homeService: HomeService,
    private translate: TranslateService,
    private message: NzMessageService,
    private route: Router,
    private router: ActivatedRoute,


  ) {
    this.currentLang = this.translate.currentLang;
    this.site_config = JSON.parse(localStorage.getItem('config') || '[]');
    if (this.site_config != null) {
      this.soical = this.site_config.socials;
      if (this.soical != null)
        this.soical.map((item) => {
          if (item.type == 'twitter') {
            this.twitter = item.value
          } else if (item.type == 'instagram') {
            this.insta = item.value
          }
          else {
            this.linked = item.value
          }
        }
        )
    }
  }

  ngOnInit(): void {

    this.route.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('/points')) {
         this.Show_point = false
        } else{
          this.Show_point = true
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });

    this.homeService.getpoints_banner().subscribe(
      res => {
        this.point_banner = res
      }
    )
  }
  // subscribe
  subscribe() {
    this.homeService.postSubscribe(this.subscribe_data).subscribe(
      res => {
        if (this.currentLang == 'ar') {
          this.message_text = 'تم الإشتراك بنجاح شكرا لك '
        } else {
          this.message_text = 'Active subscription, thank you '
        }
        this.subscribe_data.email = "";
        setTimeout(() => {
          this.message_text = ''
        }, 5000);
      }
    )
  }

}





