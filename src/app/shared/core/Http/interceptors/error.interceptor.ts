import { Component, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
 import Swal from 'sweetalert2'
import { Account } from 'src/app/shared/model/account.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';


@Injectable()



export class ErrorInterceptor implements HttpInterceptor {

    //  current lang
    currentLang;

  // account not login
  account:Account = new Account();

  // connection error
   network;
   confirmation;
   authorization;

   // inject
  constructor(
    private route: Router,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private translate: TranslateService,


  ) {
    this.currentLang = localStorage.getItem('lang')
    if (this.currentLang == 'ar') {
      this.network = "خطأ فى الأتصال بالخادم"
      this.confirmation = "يرجى تأكيد الحساب"
      this.authorization = "يرجى تسجيل الدخول"

    }else{
      this.network = "Check Your Network"
      this.confirmation = "please Confirm Your Account"
      this.authorization = "Please Login"

    }

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(
          err => {
            if (err.status == 320) {
              this.message.create('error', this.confirmation);

              this.account = err.error
               this.route.navigate([`/auth/verfiy-otp/${this.account.email_or_phone}`])
            }

            if (err.status === 401) {
              this.message.create('error', this.authorization);
              localStorage.removeItem('kaf_token');
              localStorage.removeItem('Kaf-user');
              this.route.navigate([`/auth/login`])
            }

            else if(err.status !== 320){
              this.message.create('error', err.error);
            }

            if (err.status === 0) {
              this.message.create('error', this.network);
            }

            const error = err.error ? err.error.message || err.statusText : err.status;
            return throwError(error);
          }
        )
      )
  }
}

