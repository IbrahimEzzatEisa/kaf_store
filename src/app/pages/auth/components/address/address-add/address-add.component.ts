import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from 'src/app/pages/products/models/address.model';
import { AuthService } from '../../../service/Auth.service';
import { City } from '../../../model/city.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css']
})
export class AddressAddComponent implements OnInit {

  // main object of address
  address: Address = new Address()

  @ViewChild('registerForm') registerForm: NgForm;

  // city list
  city_list: City[] = []

    // currentLang
    currentLang

  // inject
  constructor(
    private auth_service: AuthService,
    private router: Router,
    private translate: TranslateService,



  ) { }

  ngOnInit() {

    // get all city
    this.auth_service.city().subscribe(
      res => {
        this.city_list = res
      }
    )
  }

  // select city
  selectCity(event) {
    this.address.city_id = parseInt(event.target.value)
  }

  // submit
  onSubmitregister() {
    if (this.registerForm.valid) {
      this.add()
    }

  }

  // add address
  add() {
    this.auth_service.create_address(this.address).subscribe(
      res => {
        this.AllAddress()
      }
    )


  }

  // go to all address page
  AllAddress() {
    this.router.navigate([`/auth/address`])
  }


}
