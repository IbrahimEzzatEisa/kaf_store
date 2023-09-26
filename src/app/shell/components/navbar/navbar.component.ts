import { SearchProduct } from './../../model/search.model';
import { Component, DoCheck, OnInit, ViewChild, } from '@angular/core';
import { Login_user } from '../../model/login.model';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Products } from 'src/app/pages/products/models/products.model';
import { NavigationStart, Router } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service';
import { Register } from 'src/app/pages/auth/model/register.model';
import { AuthService } from 'src/app/pages/auth/service/Auth.service';
import { Login } from 'src/app/pages/auth/model/login.model';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CurrentUser } from '../../model/current_user.model';
import { TranslateService } from '@ngx-translate/core';
import { LoginSoical } from '../../model/soical_login.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {

  // main object
  login: Login = new Login()

  cart_List: Products[] = [];

  // products
  product_list: Products[] = [];

  // form and modal data
  @ViewChild('FinsihForm') FinsihForm: NgForm;
  @ViewChild('registerForm') registerForm: NgForm;
  @ViewChild('lgModalcancell') lgModalcancell: ModalDirective;
  @ViewChild('lgModalsearch') lgModalsearch: ModalDirective;
  @ViewChild('registerModel') registerModel: ModalDirective;

  8// serach main object
  model_search: SearchProduct = new SearchProduct();

  // main object of Register
  register: Register = new Register()

  // current user
  current_user: CurrentUser = new CurrentUser();

  // product load
  isSpinning: boolean = false


  // langauage
  currentLang: string = '';
  language
  socialUser!: SocialUser;

  x: string | undefined;
  message: any;
  email: string;
  name: string;
  token: string;

  // login
  login_soical: LoginSoical = new LoginSoical();

  // inject
  constructor(
    private router: Router,
    private subscription_Service: SubscriptionService,
    private AuthService: AuthService,
    private authService: SocialAuthService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,


  ) {
    this.currentLang = this.translate.currentLang;
  }

  ngOnInit(): void {


    this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
    this.current_user = JSON.parse(localStorage.getItem('Kaf-user') || '[]');

    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.login_soical.email = this.socialUser.email;
      this.login_soical.name = this.socialUser.name;
      this.login_soical.token = this.socialUser.idToken;
      this.AuthService.loginUserGoogle(this.login_soical).subscribe((res: any) => {
        localStorage.setItem('Kaf-token', String(res.auth_data.access_token))
        localStorage.setItem('Kaf-user', JSON.stringify(res))
        this.lgModalcancell.hide();

        this.x = res.message;
        this.message = res.errors;
        const phoneNumber = res.phone;
        if (phoneNumber.trim() === '') {
          let data = 'google'
          this.router.navigate([`/auth/verfiy-otp/${res.email}/${data}`])
        } else {
          window.location.assign(`/home`)

        }
      })
    });
  }


  // login
  onSubmitFinish() {
    if (this.FinsihForm.valid) {
      this.AuthService.loginUser(this.login).subscribe(
        res => {
          localStorage.setItem('Kaf-token', String(res.auth_data.access_token))
          localStorage.setItem('Kaf-user', JSON.stringify(res))
          this.router.navigate([`/product`])
          window.location.reload()
          this.lgModalcancell.hide();
          ;
          this.registerForm.resetForm();
        }
      )
    }
  }

  // open auth modal
  openAuth() {
    this.lgModalcancell.show();
    this.closeMenu()
  }



  // check cart list
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.cart_List = JSON.parse(localStorage.getItem('kaf_cart') || '[]');
    this.current_user = JSON.parse(localStorage.getItem('Kaf-user') || '[]');


  }

  // go to gomla
  gomla() {
    this.router.navigate([`/gomla`])
  }
  // go to cart

  GotoCart() {
    this.router.navigate([`/product/cart`])
  }

  // search products
  searchProducts() {
    this.isSpinning = true
    this.subscription_Service.getSearch(this.model_search.search_key).subscribe(
      res => {
        this.product_list = res;
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )

  }

  // select product search details
  select(id, $event) {
    this.model_search.search_key = "";
    this.product_list = []
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/product/details/${id}`])
    });
  }

  // openRegister
  openRegister() {
    this.lgModalcancell.hide();
    // this.registerModel.show()
    this.router.navigate([`/auth/register`])
  }

  // onSubmitregister
  onSubmitregister() {
    if (this.registerForm.valid) {
      this.register.phone = Number(this.register.phone)
      this.AuthService.register(this.register).subscribe(
        res => {
          this.lgModalcancell.show();
          this.registerForm.resetForm()
        }
      )
    }

  }

  // get item by id
  details(id) {
    this.router.navigate([`/product/details/${id}`])
  }

  // logout
  logout() {
    localStorage.removeItem('Kaf-user')
    localStorage.removeItem('Kaf-token')
    window.location.assign(`/home`)



  }

  // change langauge
  lang() {
    // change language
    this.language = localStorage.getItem('lang');
    this.translate.use(this.currentLang);
    localStorage.getItem(this.currentLang);
    if (this.translate.currentLang == 'ar') {
      this.currentLang = this.translate.currentLang;
      localStorage.setItem('lang', 'en');
      window.location.reload();

    } else {
      this.currentLang = this.translate.currentLang;
      localStorage.setItem('lang', 'ar');
      window.location.reload();
    }

  }


  closeMenu() {

    let checkbox: any = document.getElementById("menuToggle");
    checkbox.checked = false; // it returns Boolean value


  }

}
