import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { GomlaRoutingModule } from './gomla.routing';
import { GomlaComponent } from '../components/gomla/gomla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

// import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
  declarations: [
  GomlaComponent
  ],
  imports: [
    CommonModule,
    GomlaRoutingModule,
    RouterModule,
    NzCarouselModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzSpinModule
  ],

})
export class GomlaModule { }
