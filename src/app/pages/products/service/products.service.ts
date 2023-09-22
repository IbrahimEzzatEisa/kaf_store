import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/shared/core/Http/globals/global-config';
import { FilterParams } from '../models/filter-params.model';
import { DataWithRanking } from 'src/app/shared/model/data-with-ranking.model';
import { Products } from '../models/products.model';
import { ProductDetails } from '../models/product-details.model';
import { CheckOrder } from '../models/check_order.model';
import { MyPoint } from '../models/my-point.model';
import { Copone } from '../models/copone.model';
import { PaymentParmas } from '../models/paymentParmas.model';



// APIs get all crops
const API_URL_crops = END_POINTS.crops;

// APIs get all crops
const API_URL_all_cups = END_POINTS.all_cups;

// APIs get all crops
const API_URL_all_envelopes = END_POINTS.all_envelopes;

// APIs get all crops
const API_URL_products = END_POINTS.products_filter;

// APIs get all crops
const API_URL_show_product = END_POINTS.show_product;

// APIs get all crops
const API_URL_check_coupon = END_POINTS.check_coupon;

// APIs get all crops
const API_URL_check_out = END_POINTS.check_out;

// APIs fav
const API_URL_update_favorites = END_POINTS.update_favorites;

// APIs fav
const API_URL_my_favorites = END_POINTS.my_favorites;

// APIs get_points
const API_URL_get_points = END_POINTS.get_points;

// APIs get_points
const API_URL_point_details = END_POINTS.point_details;

// APIs get_points
const API_URL_check_urway = END_POINTS.check_urway;

// APIs get_points
const API_URL_notify_me = END_POINTS.notify_me;



@Injectable({
  providedIn: 'root'
})
export class ProdcutsService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',
  });


  // get all crops
  getAllCrops(): Observable<any> {
    return this.http.get<any[]>(API_URL_crops, { headers: this.headers });
  }

  getall_envelopes(): Observable<any> {
    return this.http.get<any[]>(API_URL_all_envelopes, { headers: this.headers });
  }


  getall_cups(): Observable<any> {
    return this.http.get<any[]>(API_URL_all_cups, { headers: this.headers });
  }

  getAll(filterParams?: FilterParams): Observable<DataWithRanking<Products>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<DataWithRanking<Products>>(API_URL_products, {
      params: {
        page: filterParams.pageNumber.toString(),
        limit: filterParams.pageSize.toString(),
        type: filterParams.type.toString(),
        type_id: filterParams.type_id.toString(),
        filter:filterParams.filter.toString()


      }
    })

  }

  // get product by id
  get_product_by_id(id: number): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(API_URL_show_product + `/${id}`, { headers: this.headers });
  }

  // check coupone
  check_coupon(key): Observable<Copone> {
    let body = {
      "code": key
    }
    return this.http.post<Copone>(API_URL_check_coupon, body);
  }



  // get product by id
  buy(model: CheckOrder): Observable<any> {
    return this.http.post<CheckOrder>(API_URL_check_out, model);
  }

  // get product by id
  update_favorites(id): Observable<any> {
    return this.http.post<any>(API_URL_update_favorites + `/${id}`, '');
  }


  // get product by id
   notify_me(id): Observable<any> {
    let body = {
        "product": id,
        "quantity": "1"
    }
    return this.http.post<any>(API_URL_notify_me, body);
  }

  // get fav product
  get_favorites(filterParams?: FilterParams): Observable<DataWithRanking<Products>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<DataWithRanking<Products>>(API_URL_my_favorites, {
      params: {
        page: filterParams.pageNumber.toString(),
        limit: filterParams.pageSize.toString(),
        type: filterParams.type.toString(),
        type_id: filterParams.type_id.toString(),
        filter:filterParams.filter.toString()



      }
    })

}


    // buy visa meeting package
    BuyVisa(model: PaymentParmas): Observable<any> {
      return this.http.post<any>(API_URL_check_urway, model);
    }


  // get points
  get_points(): Observable<MyPoint> {
    return this.http.get<MyPoint>(API_URL_get_points);
  }


  // get points
  get_points_details(): Observable<any> {
    return this.http.get<any>(API_URL_point_details);
  }



}




