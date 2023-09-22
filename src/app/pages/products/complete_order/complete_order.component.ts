import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Products } from '../models/products.model';
import { Address } from '../models/address.model';
import { AuthService } from '../../auth/service/Auth.service';
import { ProdcutsService } from '../service/products.service';
import { WebsiteConfig } from 'src/app/shell/model/website_config.model';
import { CheckOrder } from '../models/check_order.model';
import { FinalProduct } from '../models/final_product.model';
import { MyPoint } from '../models/my-point.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-complete_order',
  templateUrl: './complete_order.component.html',
  styleUrls: ['./complete_order.component.scss']
})
export class Complete_orderComponent implements OnInit {

  // cart list
  cart_List: Products[] = [];
  product_Obj: Products = new Products()

  // search
  total;
  search_key

  // main list
  address_list: Address[] = []
  site_config: WebsiteConfig = new WebsiteConfig();
  check_order: CheckOrder = new CheckOrder()
  final_Product: FinalProduct[] = [];
  final_Product_obj: FinalProduct = new FinalProduct();

  // isSpinning
  isSpinning: boolean = false

  // my point
  my_Point: MyPoint = new MyPoint();

  // copone_value
  copone_value: number | any;
  prcentage: number = 1;

  // final price
  final_price;
  perv_price;

  // total item in cart
  total_item;
  price_before_coupone;

  // currentLang
  currentLang

  // inject
  constructor(private message: NzMessageService,
    private router: Router,
    private auth_service: AuthService,
    private product_sevice: ProdcutsService,
    private translate: TranslateService,

  ) {
    // default lang
    this.currentLang = this.translate.currentLang;
  }

  ngOnInit() {
    // get cart
    this.getCart();
    // get all address
    this.get_all_address();
    this.site_config = JSON.parse(localStorage.getItem('config') || '');
    // get my point
    this.product_sevice.get_points().subscribe(
      res => {
        this.my_Point = res
      }, err => {
      }
    )
    // calculate final price
    this.final_price = this.total + this.site_config.delivery_charge ;
    this.perv_price = this.final_price

    // total count
    this.total_item = this.cart_List.reduce((accumulator, object) => {
      return accumulator + object.qty;
    }, 0);

  }

  //AddPoint
  AddPoint(data) {
    if (data == true) {
      if (this.my_Point.equale_ryal > this.final_price) {
        let b = this.my_Point.equale_ryal - this.final_price;
        this.final_price = 0;
        this.check_order.payment_method_used = false;
        this.check_order.payment_method = ""

      } else {
        this.final_price = this.final_price - this.my_Point.equale_ryal;
        this.price_before_coupone = this.final_price

      }
    } else {
      this.final_price = this.perv_price;
      this.price_before_coupone = this.final_price

    }
  }

  changePayment(data) {
    if (data) {
      this.check_order.wallet_used = false;
      this.final_price = this.perv_price;
      if(this.copone_value){
        this.final_price = this.final_price * (this.copone_value / this.prcentage)
      } else{
        this.final_price = this.total + this.site_config.delivery_charge ;

      }
    }
  }
  // get address list
  get_all_address() {
    this.isSpinning = true
    this.auth_service.view_address().subscribe(
      res => {
        this.isSpinning = false
        this.address_list = res;
        if (res.length > 0) {
          this.check_order.address_id = res[0].id
        }
      }, err => {
        this.isSpinning = false
      }
    )
  }


  // get cart and calculate price
  getCart() {
    this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
    // local store total price for one product
    if (this.cart_List) {
      this.cart_List.map((item => {
        item.totalPrice = (item.price * item.qty);
        return item
      }))
    }

    // total count
    this.total = this.cart_List.reduce((accumulator, object) => {
      return accumulator + object.totalPrice;
    }, 0);

  }

  // get item by id
  details(id) {
    this.router.navigate([`/product/details/${id}`])
  }

  // add tpo cart edit
  AddTocart(event, item) {
    this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
    const indexOfObject = this.cart_List.findIndex(object => {
      return object.id === item.id;
    });
    this.cart_List.splice(indexOfObject, 1);// 👉️ splice
    this.product_Obj = item
    this.product_Obj.qty = event.value
    this.cart_List.unshift(item);
    localStorage.setItem('kaf_cart', JSON.stringify(this.cart_List))
    this.getCart();

  }

  //deleteProduct
  deleteProduct(id) {
    this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
    const indexOfObject = this.cart_List.findIndex(object => {
      return object.id === id;
    });
    this.cart_List.splice(indexOfObject, 1);// 👉️ splice
    this.getCart();
    return this.cart_List
  }

  // get product pager
  goProducts() {
    this.router.navigate([`/product`])
  }

  // delct city
  getproductById(data) {
    this.check_order.address_id = parseInt(data.target.value)
  }

  // add new address
  AddNewAddress() {
    this.router.navigate([`/auth/address-add`])
  }

  // check copon
  check_coupon() {
    this.isSpinning = true
    this.product_sevice.check_coupon(this.search_key).subscribe(
      res => {
        this.check_order.coupon_id = res.id;
        if (res.value > 0) {
          this.copone_value = res.value;
          this.prcentage = 100
          this.final_price = this.final_price * (this.copone_value / this.prcentage)
        }
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )

  }

  // remove coupon
  remove_coupone() {
    this.search_key = "";
    this.copone_value = null
    // this.final_price = this.price_before_coupone
    this.final_price = this.total + this.site_config.delivery_charge ;

  }

  // complete
  complete() {
    let token: any = (localStorage.getItem('Kaf-token'));
    if (!token) {
      this.router.navigate([`/auth/login`])
    }
    else {
      this.isSpinning = true
      this.cart_List.map((item) => {
        let body = {
          "product_id": item.id,
          "quantity": item.quantity,
        }

        this.final_Product.push(Object.assign(body))
        return item
      });

      if (this.check_order.payment_method) {
        this.check_order.payment_method_used = true
      } else {
        this.check_order.payment_method_used = false
      }
      this.check_order.products = this.final_Product;

      this.product_sevice.buy(this.check_order).subscribe(
        res => {
          if (res.payment_url != null) {
            localStorage.removeItem('kaf_cart');
            this.isSpinning = false
            let newText = res.payment_url.replace('https://payments-dev.urway-tech.com/URWAYPGService/direct.jsp?paymentid=', '');
            this.router.navigate([`/product/payment/${newText}`])
            //  localStorage.
          } else {
            localStorage.removeItem('kaf_cart');
            this.isSpinning = false
            this.router.navigate([`/product/thanks`])
          }

        }, err => {
          this.isSpinning = false

        }
      )
    }
  }


}



