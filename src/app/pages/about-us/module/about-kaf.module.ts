import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AboutUsComponent } from '../components/about-us.component';
import { AboutKafRoutingModule } from './about-kaf.routing';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

// import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
  declarations: [
    AboutUsComponent,


  ],
  imports: [
    CommonModule,
    AboutKafRoutingModule,
    RouterModule,
    NzCarouselModule,
    CarouselModule,
    TranslateModule,
    NzSpinModule

  ],

})
export class AboutKAfModule { }
