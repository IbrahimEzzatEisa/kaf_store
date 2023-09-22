import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from 'src/app/shared/core/Http/globals/global-config';
import { Slider } from '../models/slider.model';
import { About } from '../models/about.model';
import { PointBanner } from 'src/app/shell/model/banner-point.model';
import { Subscribe } from '../models/subscribe.model';


// APIs get all sections
const API_URL = END_POINTS.slider;

// APIs get all sections
const API_URL_about = END_POINTS.aboutus;

// APIs get all sections
const API_URL_store_banner = END_POINTS.store_banner;

// APIs get all sections
const API_URL_points_banner = END_POINTS.points_banner;


// APIs get all sections
const API_URL_subcsribe = END_POINTS.add_newsletter;


// APIs get all sections
const API_URL_terms= END_POINTS.get_terms_and_conditions;




@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',
  });


  // get all section
  getSlider(): Observable<any> {
    return this.http.get<Slider[]>(API_URL, { headers: this.headers });
  }

  // get all section
  getAbout(): Observable<About> {
    return this.http.get<About>(API_URL_about, { headers: this.headers });
  }

   // get all section
   getTerms(): Observable<any> {
    return this.http.get<any>(API_URL_terms, { headers: this.headers });
  }

  // get all section
  getstore_banner(): Observable<any> {
    return this.http.get<Slider>(API_URL_store_banner, { headers: this.headers });
  }

  // get all section
  getpoints_banner(): Observable<any> {
    return this.http.get<PointBanner>(API_URL_points_banner, { headers: this.headers });
  }


  // get all section
  postSubscribe(model:Subscribe): Observable<Subscribe> {
    return this.http.post<Subscribe>(API_URL_subcsribe, model);
  }


}




