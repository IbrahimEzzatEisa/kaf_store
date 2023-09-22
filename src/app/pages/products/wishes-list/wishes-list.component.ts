import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products.model';
import { ProdcutsService } from '../service/products.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HomeService } from '../../home/service/sections.service';
import { FilterParams } from '../models/filter-params.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wishes-list',
  templateUrl: './wishes-list.component.html',
  styleUrls: ['./wishes-list.component.css']
})
export class WishesListComponent implements OnInit {

  // products
  product_list: Products[] = [];
  product_Obj: Products = new Products()

  // page load
  isSpinning: boolean = false;


  // paghination
  totalNumberOfPages
  totalNumberOfItems
  filterParams = new FilterParams();

  // message
  message_add;
  message_Add_fav

  // currentLang
  currentLang

  // inject
  constructor(
    private prodcuts_Service: ProdcutsService,
    private homeService: HomeService,
    private message: NzMessageService,
    private router: Router,
    private translate: TranslateService,

  ) {
    // default lang
    this.currentLang = this.translate.currentLang;
    if (this.currentLang == 'ar') {
      this.message_add = "تم إضافة المنتج لسلة المشتريات ",
        this.message_Add_fav = "تم إضافةالمنتج للمفضلة "

    } else {
      this.message_add = "The product has been added to the cart",
        this.message_Add_fav = " The product has been added to favorites "

    }
  }


  ngOnInit() {
    this.filterParams.pageSize = 12;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // call main function
    this.getProducts()
  }

  // main function
  getProducts() {
    this.isSpinning = true;
    this.prodcuts_Service.get_favorites().subscribe(
      res => {
        this.product_list = res.data;
        this.filterParams.pageNumber = Number(res.pageIndex);
        this.isSpinning = false;
        this.filterParams.pageSize = res.pageSize
        this.totalNumberOfPages = res.totalPagesCount
        this.totalNumberOfItems = res.totalItemCount;
      }, err => {
        this.isSpinning = false;
      }
    )
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

  // pagination
  changePage(pageNumber) {
    this.filterParams.pageNumber = pageNumber;
    this.getProducts();
  }

  // details
  details(id) {
    this.router.navigate([`/product/details/${id}`])
  }

}
