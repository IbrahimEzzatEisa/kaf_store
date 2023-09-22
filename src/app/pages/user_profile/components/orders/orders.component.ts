import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/shell/services/subscription.service';
import { FilterParams } from '../../models/filter.model';
import { Orders } from '../../models/orders.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  // page main array

  order_list: Orders[] = []

  // filter
  filterParams:FilterParams = new FilterParams()

  totalNumberOfPages
  totalNumberOfItems

  // currentLang
  currentLang

  // page load
  isSpinning: boolean = false

  constructor(
    private subscription_Service: SubscriptionService,
    private router: Router,
    private translate: TranslateService,
  ) {
    // default lang
    this.currentLang = this.translate.currentLang;
  }


  ngOnInit() {


    this.filterParams.pageSize = 3;
    this.getAllOrders();

  }

  // get orders
  getAllOrders() {

    // call main function
   this.isSpinning = true;
    this.subscription_Service.getAllOrders(this.filterParams).subscribe(
      res => {
        this.order_list = res.data
        this.filterParams.pageNumber = Number(res.pageIndex);
        this.filterParams.pageSize = res.pageSize
        this.totalNumberOfPages = res.totalPagesCount
        this.totalNumberOfItems = res.totalItemCount;
        this.isSpinning = false;
      }, err => {
        this.isSpinning = false

      }
    )
  }
  // pagination
  changePage(pageNumber) {
    this.filterParams.pageNumber = pageNumber;
    this.getAllOrders();
  }

  // invoice
  invoice(id) {
    this.isSpinning = true
    this.subscription_Service.Invoice(id).subscribe(
      res => {
        window.open(res, "_blank");
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )
  }

  cancel(id) {
    this.isSpinning = true
    this.subscription_Service.Invoice(id).subscribe(
      res => {
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )


  }


  // tracking order
  track_order(number) {
    this.router.navigate([`/user/track/${number}`])
  }

  // Repay
  Repay(id) {
    this.isSpinning = true
    this.subscription_Service.repayOrder(id).subscribe(
      res => {
        let newText = res.payment_url.replace('https://payments-dev.urway-tech.com/URWAYPGService/direct.jsp?paymentid=', '');
        this.router.navigate([`/product/payment/${newText}`])
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )

  }

}
