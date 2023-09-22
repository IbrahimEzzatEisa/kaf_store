import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs';
import { SubscriptionService } from './shell/services/subscription.service';
import { WebsiteConfig } from './shell/model/website_config.model';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslationService } from './shared/i18n';
import { locale as enLang } from './shared/i18n/vocabs/ar';
import { locale as arLang } from './shared/i18n/vocabs/en';
import { initFlowbite } from 'flowbite';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  site_config: WebsiteConfig = new WebsiteConfig();

  //currentLang
  currentLang


  constructor(
    private spinner: NgxSpinnerService,
    private route: Router,
    private titleService: Title,
    private router: ActivatedRoute,
    private subscription_Service: SubscriptionService,
    private translate: TranslateService,
    private translationService: TranslationService,


  ) {



    // webs ite config
    this.subscription_Service.config().subscribe(
      res => {
        localStorage.setItem('config', JSON.stringify(res))
      }
    )

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.currentLang = event.lang;
      this.currentLang = this.translate.currentLang
    });

    this.route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      } else if (event instanceof NavigationEnd) {
        this.spinner.hide();
      }
    });

    this.route.events.forEach((event) => {
      if (event instanceof NavigationStart) {

        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          window.scrollTo(0,0);

          this.up()
          window.scrollTo({ top: 0, behavior: 'smooth' });

        }, 2100);


      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });


    this.route.events.pipe(filter(event => event instanceof NavigationEnd),).subscribe(
      () => {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          window.scrollTo(0,0);

          this.up()

        this.up()
        var rt = this.getChild(this.router)
        rt.data.subscribe(data => {
          this.titleService.setTitle(data.title)

        })

          window.scrollTo({ top: 0, behavior: 'smooth' });

        }, 2100);




      }
    )


    // config translations
    this.translationService.loadTranslations(
      enLang,
      arLang,
    );



    if (localStorage.getItem('lang')) {
      this.translate.use(localStorage.getItem('lang') ?? 'ar');
    }



    const bo = document.querySelector('body');
    let el = document.querySelector('html');
    if (this.translate.currentLang == 'ar') {
      el!.setAttribute('direction', 'rtl');
      el!.setAttribute('dir', 'rtl');
      el!.style.direction = 'rtl';
      bo!.classList.add('arabic');
      el!.classList.add('arabic');
      bo!.classList.remove('English');
      el!.classList.remove('English');
      localStorage.setItem('lang', 'ar');
      // this.titleService.setTitle("آيكتك");
      this.up()



    } else {
      el!.setAttribute('direction', 'ltr');
      el!.setAttribute('dir', 'ltr');
      el!.style.direction = 'ltr';
      bo!.classList.remove('arabic');
      el!.classList.remove('arabic');
      bo!.classList.add('English');
      el!.classList.add('English');
      localStorage.setItem('lang', 'en');
      this.up()

      // this.titleService.setTitle(" AICTEC")
    }



  }


  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild)
    } else {
      return activatedRoute
    }
  }
  up() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  ngOnInit(): void {
    initFlowbite();
  }

}
