import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { WishesListComponent } from '../wishes-list/wishes-list.component';
import { CartComponent } from '../cart/cart.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Complete_orderComponent } from '../complete_order/complete_order.component';
import { ThanksComponent } from '../thanks/thanks.component';
import { PaymentComponent } from '../payment/payment.component';
import { PaymentInfoComponent } from '../payment-info/payment-info.component';


const routes: Routes = [
  {
  path: '',
  component: ProductListComponent,
  data:{title:" كــاف /  المنتجات"}

},

{
  path: 'details/:id',
  component: ProductDetailsComponent,
  data:{title:" كــاف /  تفاصيل المنتج"}

},

{
  path: 'cart',
  component: CartComponent,
  data:{title:" كــاف /  سلة "}

},


{
  path: 'complete-order',
  component: Complete_orderComponent,
  data:{title:" كــاف /  اتمام عملية الشراء "}
},

{
  path: 'thanks',
  component: ThanksComponent,
  data:{title:" كــاف /  شكرا لك  "}
},

{
  path: 'payment/:dataUrl',
  component: PaymentComponent,
  data:{title:" كــاف / الدفع  "}
},

{
  path: 'payment-info',
  component: PaymentInfoComponent,
  data:{title:" كــاف / حالة الدفع  "}
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
