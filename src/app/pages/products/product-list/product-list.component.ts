import { Component, OnInit } from '@angular/core';
import { ProdcutsService } from '../service/products.service';
import { Crops } from '../models/crops.model';
import { HomeService } from '../../home/service/sections.service';
import { Slider } from '../../home/models/slider.model';
import { Products } from '../models/products.model';
import { FilterParams } from '../models/filter-params.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cart } from '../models/cart.model';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  navbarList: Crops[] = []
  cupsList: Crops[] = []
  envelopesList: Crops[] = []

  // main object store_banner
  store_banner: Slider = new Slider();
  filterParams = new FilterParams()

  // products
  product_list: Products[] = [];
  product_Obj: Products = new Products()
  totalNumberOfPages
  totalNumberOfItems


  // select category
  selected_id;
  selected_env_id;
  selected_cups_id
  cart_List: Products[] = [];

  // isSpinning
  isSpinning: boolean

  // langauage
  currentLang: string = '';
  language

  // message
  message_add;
  message_Add_fav;

  // local
  all_masouel: any

  //message_Add_fav
  message_Add_notify;
  // inject
  constructor(
    private prodcuts_Service: ProdcutsService,
    private homeService: HomeService,
    private message: NzMessageService,
    private router: Router,
    private translate: TranslateService,

  ) {
    this.currentLang = this.translate.currentLang;
    if (this.currentLang == 'ar') {
      this.message_add = "تم إضافة المنتج لسلة المشتريات ";
      this.message_Add_notify =" تم إرسال طلبك بنجاح .. سوف يتم إبالغك عند توفر المنتج .. شكرا لك"

        this.message_Add_fav = "تم إضافةالمنتج للمفضلة ";
      this.all_masouel = {
        'id': -1,
        'name': " الكل"
      }


    } else {
      this.message_add = "The product has been added to the cart",
        this.message_Add_fav = " The product has been added to favorites ";
        this.message_Add_notify ="Your order has been sent successfully. You will be notified when the product is available. Thank you."

      this.all_masouel = {
        'id': -1,
        'name': " All"
      }
    }
  }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.selected_id = -1

    // call main function
    this.getBanner();

    // masoul
    this.masoul();

    this.filterParams.pageSize = 12;

    // call main function
    this.getProducts()
  }


  // get banner
  getBanner() {
    this.isSpinning = true
    this.homeService.getstore_banner().subscribe(
      res => {
        this.store_banner.image = res.image;
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )
  }



  // get masgoul
  masoul() {
    this.isSpinning = true
    this.prodcuts_Service.getAllCrops().subscribe(
      res => {
        this.navbarList = res;
        this.navbarList.unshift(this.all_masouel)
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )
  }

  // get all meeting
  getProducts() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.filterParams.pageSize = 12;
    this.isSpinning = true
    this.prodcuts_Service.getAll(this.filterParams).subscribe(
      res => {
        this.isSpinning = false
        this.filterParams.pageNumber = Number(res.pageIndex);
        this.product_list = res.data
        this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
        if (this.cart_List.length > 0) {
          this.product_list = res.data;
          this.product_list.map((item => {
            this.cart_List.map((data => {
              if (data.id == item.id) {
                item.qty = data.qty;
                return item
              }
            }))

          }));
        }
        this.filterParams.pageSize = res.pageSize
        this.totalNumberOfPages = res.totalPagesCount
        this.totalNumberOfItems = res.totalItemCount;
      },
      err => {
        this.isSpinning = false

      })
  }

  // AddLike
  AddLike(id) {
    this.isSpinning = true
    this.prodcuts_Service.update_favorites(id).subscribe(
      res => {
        this.getProducts();
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
        this.getProducts();
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      })
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
  // select
  SelectCpos(id) {
    this.selected_id = parseInt(id);
    if(this.selected_id == -1) {
      this.filterParams.type_id ="";
    }else{
      this.filterParams.type_id = parseInt(id);

    }
    this.filterParams.type = "crop";
    this.selected_env_id = false;
    this.selected_cups_id = false;
    this.filterParams.pageNumber = 1
    this.getProducts()
  }

  Selectenvlopes() {
    this.selected_id = 0;
    this.selected_cups_id = 0
    this.filterParams.type = "envelope";
    this.filterParams.type_id = "";
    this.selected_env_id = true;
    this.selected_cups_id = false;
    this.filterParams.pageNumber = 1
    this.getProducts()
  }

  SelectCups() {
    this.selected_id = 0;
    this.selected_env_id = 0
    this.selected_cups_id = true
    this.filterParams.type = "cup";
    this.filterParams.type_id = "";
    this.filterParams.pageNumber = 1
    this.getProducts()

  }


  // sort()
  sort(data) {
    this.filterParams.filter = data.target.value;
    this.getProducts()

  }
  // pagination
  changePage(pageNumber) {
    this.filterParams.pageNumber = pageNumber;
    this.getProducts();
  }

  // update
  AddTocart(event, item) {
    this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
    const indexOfObject = this.cart_List.findIndex(object => {
      return object.id === item.id;
    });
    this.cart_List.splice(indexOfObject, 1);// 👉️ splice
    this.product_Obj = item
    this.product_Obj.qty = event.value;
    // this.product_Obj.small_description = item.
    this.cart_List.unshift(item);
    localStorage.setItem('kaf_cart', JSON.stringify(this.cart_List))
    // this.message.create('success', `تم تعديل المنتج `);


  }
  // add first
  AddFirst(data: Products) {
    this.message.create('success', this.message_add);
    this.product_Obj = data
    this.product_Obj.qty = 1
    this.cart_List.unshift(this.product_Obj);
    localStorage.setItem('kaf_cart', JSON.stringify(this.cart_List))

  }


  // get item by id
  details(id) {
    this.router.navigate([`/product/details/${id}`])
  }


}
