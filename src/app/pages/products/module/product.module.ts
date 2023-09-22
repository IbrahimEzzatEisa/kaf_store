import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CartComponent } from '../cart/cart.component';
import { WishesListComponent } from '../wishes-list/wishes-list.component';
import { ProductRoutingModule } from './product.routing';
import { AccordionModule } from 'primeng/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ShellModule } from 'src/app/shell/shell.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { TabViewModule } from 'primeng/tabview';
import { Complete_orderComponent } from '../complete_order/complete_order.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ThanksComponent } from '../thanks/thanks.component';
// import { NguCarouselModule } from '@ngu/carousel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { TranslateModule } from '@ngx-translate/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { PaymentComponent } from '../payment/payment.component';
import { PaymentInfoComponent } from '../payment-info/payment-info.component';
@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    Complete_orderComponent,
    ThanksComponent,
    PaymentComponent,
    PaymentInfoComponent


  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RouterModule,
    NzCarouselModule,
    CarouselModule,
    CollapseModule,
    ShellModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    NzMessageModule,
    NzSelectModule,
    TabViewModule,
    NzRadioModule,
    NzInputModule,
    NzSpinModule,
    PanelMenuModule,
    NzCollapseModule,
    TranslateModule,
    NzCheckboxModule
  ],

})
export class ProductModule { }
