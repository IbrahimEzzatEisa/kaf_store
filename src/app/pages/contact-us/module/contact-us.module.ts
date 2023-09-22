import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ContactUSComponent } from '../components/contact-us.component';
import { ContactUSRoutingModule } from './contact-us.routing';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { TranslateModule } from '@ngx-translate/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContactUSComponent,

  ],
  imports: [
    CommonModule,
    ContactUSRoutingModule,
    RouterModule,
    NzCarouselModule,
    CarouselModule,
    NzCollapseModule,
    TranslateModule,
    NzSpinModule,
    RouterModule,
    NzCarouselModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzSpinModule

  ],

})
export class ContactUSModule { }
