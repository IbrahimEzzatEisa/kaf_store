import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../model/register.model';
import { END_POINTS } from 'src/app/shared/core/Http/globals/global-config';
import { Login } from '../model/login.model';
import { OTPVerification } from '../model/otp.model';
import { Address } from '../../products/models/address.model';
import { CurrentUser } from 'src/app/shell/model/current_user.model';
import { ChangePassword } from '../../user_profile/models/change-password.model';
import { NewPassword } from '../../user_profile/models/newPassword.model';
import { LoginSoical } from 'src/app/shell/model/soical_login.model';

// API  login
const API_login = END_POINTS.login;

// API  register
const API_register = END_POINTS.register;

// API  check_code
const API_check_code = END_POINTS.check_code;

// API  resend_code
const API_resend_code = END_POINTS.resend_code;

// API  API_city
const API_city = END_POINTS.all_city;

// API  add_address
const API_add_address = END_POINTS.add_address;

// API  add_address
const API_view_address = END_POINTS.view_address;

// API  delete_address
const API_delete_address = END_POINTS.delete_address;

// API  profile
const API_profile = END_POINTS.profile;

// API  profile
const API_view_profile = END_POINTS.view_profile;

// API  reset password
const API_reset_passsword = END_POINTS.reset_password;

// API  reset password
const API_reset_passsword_new = END_POINTS.new_password;

// API  change password
const API_forget_password = END_POINTS.forget;

// API  login
const API_login_google = END_POINTS.login_google;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',
  });


  // post subscription
  loginUser(model: Login): Observable<any> {
    return this.http.post<Login>(API_login, model);
  }

    // post subscription
    loginUserGoogle(model: LoginSoical): Observable<any> {
      return this.http.post<LoginSoical>(API_login_google, model);
    }

  // post register
  register(model: Register): Observable<any> {
    return this.http.post<Register>(API_register, model);
  }


  // post register
  Edit_profile(model: CurrentUser): Observable<any> {
    return this.http.post<CurrentUser>(API_profile, model);
  }

  // get profile
  get_profile(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(API_view_profile);
  }

  // change password
  changePassword(model: ChangePassword): Observable<any> {
    return this.http.post<ChangePassword>(API_reset_passsword, model);
  }
  // change password
  changeNewPassword(model: NewPassword): Observable<any> {
    return this.http.post<NewPassword>(API_reset_passsword_new, model);
  }


  // forget password
  forgetPassword(email_or_phone: string): Observable<any> {
    let body = {
      "email_or_phone": email_or_phone
    }
    return this.http.post<any>(API_forget_password, body);
  }



  // post subscription
  veifiy_code(model: OTPVerification): Observable<OTPVerification> {
    return this.http.post<OTPVerification>(API_check_code, model);
  }

  // post subscription
  get_veifiy_code(phone): Observable<any> {
    let body = {
      "phone": phone
    }
    return this.http.post<any>(API_resend_code, body);
  }


  // get all city
  city(): Observable<any> {
    return this.http.get<any>(API_city);
  }

  // post address
  create_address(model: Address): Observable<Address> {
    return this.http.post<Address>(API_add_address, model);
  }

  // get address
  view_address(): Observable<Address[]> {
    return this.http.get<Address[]>(API_view_address);
  }
  // get address by id
  getAddress(id): Observable<Address> {
    return this.http.get<Address>(API_view_address + `/${id}`);
  }




  // // get address
  // view_address(): Observable<Address[]> {
  //   return this.http.get<Address[]>(API_view_address);
  // }

  // get address
  delete_address(id: number): Observable<any> {
    return this.http.delete<any>(API_delete_address + `/${id}`);
  }
}
