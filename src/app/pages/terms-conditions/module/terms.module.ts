import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TermsConditionsComponent } from '../terms-conditions.component';
import { TermsRoutingModule } from './terms.routing';

// import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
  declarations: [
    TermsConditionsComponent

  ],
  imports: [
    CommonModule,
    TermsRoutingModule,
    RouterModule,
    NzCarouselModule,
    CarouselModule,
    TranslateModule,
    NzSpinModule

  ],

})
export class TermsModule { }
