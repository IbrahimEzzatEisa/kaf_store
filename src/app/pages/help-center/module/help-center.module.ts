import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { HelpCenterRoutingModule } from './help-center.routing';
import { HelpCenterComponent } from '../components/help-center.component';

@NgModule({
  declarations: [
    HelpCenterComponent,

  ],
  imports: [
    CommonModule,
    HelpCenterRoutingModule,
    RouterModule,
    NzCarouselModule,
    CarouselModule,
    NzCollapseModule,
    TranslateModule,
    NzSpinModule
  ],

})
export class HelpCenterModule { }
