import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdcutsService } from '../service/products.service';
import { ProductDetails } from '../models/product-details.model';
import { Products } from '../models/products.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  // main array of product and cart list
  product_Details: ProductDetails = new ProductDetails()
  cart_List: Products[] = [];
  product_Obj: ProductDetails = new ProductDetails()
  product_list: Products[] = [];

  // mainImage
  mainImage: string;

  // page load
  isSpinning: boolean = false;

  // currentLang
  currentLang

  // message
  message_add;
  message_Add_fav;
  message_Add_notify

  // inject
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prodcuts_Service: ProdcutsService,
    private message: NzMessageService,
    private translate: TranslateService,

  ) {
    // default lang
    this.currentLang = this.translate.currentLang;
    if(this.currentLang == 'ar'){
      this.message_add = "تم إضافة المنتج لسلة المشتريات ",
      this.message_Add_fav = "تم إضافةالمنتج للمفضلة "
      this.message_Add_notify =" تم إرسال طلبك بنجاح .. سوف يتم إبالغك عند توفر المنتج .. شكرا لك"

    }else{
      this.message_add = "The product has been added to the cart",
      this.message_Add_fav = " The product has been added to favorites "
      this.message_Add_notify ="Your order has been sent successfully. You will be notified when the product is available. Thank you."

    }
  }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // call main function
    this.getProduct()
  }


  // get product
  getProduct() {
    this.isSpinning = true
    let id = this.route.snapshot.params.id;
    this.prodcuts_Service.get_product_by_id(id).subscribe(
      res => {
        this.isSpinning = false
        this.product_Details = res;
        this.mainImage = res.main_image
        this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
        this.cart_List.map((data => {
          if (data.id == this.product_Details.id) {
            this.product_Details.qty = data.qty;
            return this.product_Details
          }
        }))
        this.product_Details.simillar_products.map((item => {
          this.cart_List.map((data => {
            if (data.id == item.id) {
              item.qty = data.qty;
              return item
            }
          }))
          this.isSpinning = false
        }))
      }, err => {
        this.isSpinning = false

      }

    )
  }

  // display image
  dispalyImage(image) {
    this.mainImage = image

  }
  // edit
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
  }

  // add to cart
  AddFirst(data: ProductDetails | any) {
    this.message.create('success', this.message_add);
    this.product_Obj = data
    this.product_Obj.qty = 1
    this.cart_List.unshift(this.product_Obj);
    localStorage.setItem('kaf_cart', JSON.stringify(this.cart_List))

  }

  // add yo cart
  AddFirst_related(data) {
    this.message.create('success', this.message_add);
    this.product_Obj = data
    this.product_Obj.qty = 1
    this.cart_List.unshift(this.product_Obj);
    localStorage.setItem('kaf_cart', JSON.stringify(this.cart_List))
  }


  // Notify
  Notify(id){
    this.isSpinning = true
    this.prodcuts_Service.notify_me(id).subscribe(
      res => {
        this.isSpinning = false;
        this.message.create('success', this.message_Add_notify);
      }, err => {
        this.isSpinning = false
      })
  }


  // get item by id
  details(id) {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/product/details/${id}`])
    });

  }


  // AddLike
  AddLike(id) {
    this.isSpinning = true
    this.prodcuts_Service.update_favorites(id).subscribe(
      res => {
        this.getProduct();
        this.isSpinning = false;
        this.message.create('success', this.message_Add_fav);
      }, err => {
        this.isSpinning = false
      }
    )
  }

  // removeLike
  removeLike(id) {
    this.isSpinning = true
    this.prodcuts_Service.update_favorites(id).subscribe(
      res => {
        this.getProduct();
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      })
  }

}
