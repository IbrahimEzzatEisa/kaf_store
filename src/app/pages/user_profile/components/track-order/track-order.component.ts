import { Component, OnInit } from '@angular/core';
import { TrackOrder } from '../../models/tracke_order.model';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionService } from 'src/app/shell/services/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingStatus } from '../../models/tracking-status.model';
import { TrackingData } from '../../models/data-tracking.model';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  // current lang
  currentLang = '';

  // page load
  isSpinning: boolean;

  // main object
  track_Order: TrackOrder = new TrackOrder();
  track_Order_obj: TrackingData = new TrackingData();
  track_staus: TrackingStatus[] = [];


  // inject
  constructor(
    private translate: TranslateService,
    private Subscription_Service: SubscriptionService,
    private route: Router,
    private router: ActivatedRoute

  ) {
    // default lang
    this.currentLang = this.translate.currentLang;
  }

  ngOnInit() {
    this.vew_track()
  }


  // vew_track
  vew_track() {
    this.isSpinning = true
    this.Subscription_Service.track_order(this.router.snapshot.params.id).subscribe(
      res => {
        this.track_Order = res;
        this.track_Order_obj = this.track_Order.data
        this.track_staus = this.track_Order.trackings
        this.isSpinning = false
      }, err => {
        this.isSpinning = false
      }
    )


  }
}
