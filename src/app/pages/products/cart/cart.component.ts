import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // cart list
  cart_List: Products[] = [];

  //  main object
  product_Obj: Products = new Products()

  // total count
  total;
  total_item;

  // currentLang
  currentLang

  // inject
  constructor(
    private message: NzMessageService,
    private router: Router,
    private translate: TranslateService,
  ) {
    // default lang
    this.currentLang = this.translate.currentLang;
  }


  ngOnInit() {
    this.getCart();
  }

  // get cart and calculate price
  getCart() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

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

    // total count
    this.total_item = this.cart_List.reduce((accumulator, object) => {
      return accumulator + object.qty;
    }, 0);

  }
  // get item by id
  details(id) {
    this.router.navigate([`/product/details/${id}`])
  }

  // update
  AddTocart(event, item) {
    this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
    this.cart_List.map((data) => {
      if (data.id == item.id) {
        data.qty = event.value
        return data
      }
    })
    localStorage.setItem('kaf_cart', JSON.stringify(this.cart_List))
    this.getCart();
  }


  //deleteProduct
  deleteProduct(id, index) {
    this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
    const indexOfObject = this.cart_List.findIndex(object => {
      return object.id === id;
    });
    this.cart_List.splice(index, 1);// 👉️ splice
    localStorage.setItem('kaf_cart', JSON.stringify(this.cart_List))
    this.getCart();
    return this.cart_List

  }

  // get product
  goProducts() {
    this.router.navigate([`/product`])
  }

  // complete
  complete() {
    let token: any = (localStorage.getItem('Kaf-token'));
    if (!token) {
      this.router.navigate([`/auth/login`])
    }
    else {
      this.router.navigate([`/product/complete-order`])
    }
  }
}
