import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from '../core/Http/globals/global-config';
import { Config } from '../model/config.model';
import { NewsPopUp } from '../model/newspopup.model';
import { Partners } from '../model/partner.model';

// API  config
const config = END_POINTS.config;

const popup = END_POINTS.NewsPopUp;

// partners
const partner = END_POINTS.partner;


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }


   // get Config
   getConfig(): Observable<Config> {
    return this.http.get<Config>(config);
  }

     // get Config
     getnewsPop(): Observable<NewsPopUp> {
      return this.http.get<NewsPopUp>(popup);
    }


    // get partner
    getPartner(): Observable<Partners> {
      return this.http.get<Partners>(partner);
    }



}
