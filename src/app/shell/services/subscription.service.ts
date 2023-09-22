import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/shared/core/Http/globals/global-config';
import { SubScribtion } from '../model/subscription.model';
import { SubScriptionMail } from '../model/subscriptionEmail.model';
import { Gomla } from 'src/app/pages/gomla/models/gomla.model';
import { SearchProduct } from '../model/search.model';
import { WebsiteConfig } from '../model/website_config.model';
import { FilterParams } from 'src/app/pages/user_profile/models/filter.model';
import { DataWithRanking } from 'src/app/shared/model/data-with-ranking.model';
import { Orders } from 'src/app/pages/user_profile/models/orders.model';
import { HelpCenter } from 'src/app/pages/contact-us/models/helpCenter.model';
import { ContactUs } from 'src/app/pages/contact-us/models/contact-us.model';

// API  subscription
const subscription = END_POINTS.gomla_section_send;

// API  subscription E-mail
const subscriptionEmail = END_POINTS.gomla_section_send;

// API  common_questions
const common_questions = END_POINTS.common_questions;

const API_search = END_POINTS.search;

const API_site_settings = END_POINTS.site_settings;

const API_my_orders = END_POINTS.my_orders;

const API_invoice = END_POINTS.order_invoice;

const API_track_shipment = END_POINTS.track_shipment;

const API_repayOrder = END_POINTS.repayOrder;

const API_contact= END_POINTS.send_contact;

const API_cancel_order= END_POINTS.cancel_order;




@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',
  });


  // post subscription
  create(model: Gomla): Observable<Gomla> {
    return this.http.post<Gomla>(subscription, model);
  }
    // post subscription
    contact_us(model: ContactUs): Observable<ContactUs> {
      return this.http.post<ContactUs>(API_contact, model);
    }

  // post subscription with mail
  createWithMail(model: SubScriptionMail): Observable<SubScriptionMail> {
    return this.http.post<SubScriptionMail>(subscriptionEmail, model);
  }

  // getcommon_questions
  getcommon_questions(): Observable<HelpCenter[]> {
    return this.http.get<HelpCenter[]>(common_questions);
  }

  // getcommon_questions
  getSearch(search_key): Observable<any> {
    return this.http.get<any>(API_search + `?search_key=${search_key}`)
  }

  // get website config
  config(): Observable<WebsiteConfig> {
    return this.http.get<WebsiteConfig>(API_site_settings);
  }

  // get all orders
  getAllOrders(filterParams?: FilterParams): Observable<DataWithRanking<Orders>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<DataWithRanking<Orders>>(API_my_orders, {
      params: {
        page: filterParams.pageNumber.toString(),
        limit: filterParams.pageSize.toString(),

      }

    })

  }

  // invoice
  Invoice(order_number: string): Observable<any> {
    let body = {
      "order_number": order_number
    }
    return this.http.post<any>(API_invoice, body);
  }

    // invoice
    repayOrder(order_number: string): Observable<any> {
      return this.http.post<any>(API_repayOrder+`/${order_number}` , '');
    }

    // cancel
    cancel_order(order_number: string): Observable<any> {
      let body = {
        "cancel_reson": ''
      }
      return this.http.post<any>(API_cancel_order+`/${order_number}` , body);
    }



  // invoice
  track_order(order_number: string): Observable<any> {
    let body = {
      "tracking_number": order_number
    }
    return this.http.post<any>(API_track_shipment, body);
  }

}
