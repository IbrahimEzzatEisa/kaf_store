import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/Auth.service';
import { Router } from '@angular/router';
import { Address } from 'src/app/pages/products/models/address.model';
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';
import { Products } from 'src/app/pages/products/models/products.model';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  // main array of address
  address_list: Address[] = []

  // currentLang
  currentLang

  // meessage
  are_you_sure;
  yes;
 no;


 //  total_item in cart
  total_item;

  // main array
  cart_List: Products[] = [];

  // inject
  constructor(
    private auth_service: AuthService,
    private router: Router,
    private translate: TranslateService,

  ) {
    // default lang
    this.currentLang = this.translate.currentLang;

    if(this.currentLang == 'ar') {
      this.are_you_sure= ' هـل أنت متأكد ؟';
      this.yes = 'نعم ',
      this.no = 'لا'
    }else{
      this.are_you_sure= 'Are you sure ?';
      this.yes = 'Yes',
      this.no = 'لا'

    }
  }

  ngOnInit() {
    this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
    // total count
    this.total_item = this.cart_List.reduce((accumulator, object) => {
      return accumulator + object.qty;
    }, 0);


    // get all address
    this.get_all_address()
  }

  // get address list
  get_all_address() {
    this.auth_service.view_address().subscribe(
      res => {
        this.address_list = res
      }
    )
  }

  // go to add address page
  add_address() {
    this.router.navigate([`/auth/address-add`])
  }

  // edir address
  edit(id) {
    this.router.navigate([`/auth/address/${id}`])
  }

  // delete address
  delete_address(id) {
    Swal.fire({
      title: this.are_you_sure,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#831539',
      cancelButtonColor: '#ecdec3',
      confirmButtonText: this.yes,
      cancelButtonText: this.no

    }).then((result) => {
      if (result.isConfirmed) {
        this.auth_service.delete_address(id).subscribe(
          res => {
            this.get_all_address()
          }
        )

      }
    })
  }

  // go to shop
  Shop() {
    this.router.navigate([`/product/complete-order`])
  }

  // store
  store(){
    this.router.navigate([`/product`])
  }
}
