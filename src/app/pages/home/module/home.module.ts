import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../component/home.component';
import { HomeRoutingModule } from './home.routing';
import { RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TranslateModule } from '@ngx-translate/core';

// import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    NzCarouselModule,
    CarouselModule,
    TranslateModule,


  ],

})
export class HomeModule { }
