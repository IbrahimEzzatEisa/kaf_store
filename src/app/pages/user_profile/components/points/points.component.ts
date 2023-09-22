import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MyPoint } from 'src/app/pages/products/models/my-point.model';
import { ProdcutsService } from 'src/app/pages/products/service/products.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
})
export class PointsComponent implements OnInit {

  // currentLang
  currentLang

  // my point
  my_Point: MyPoint = new MyPoint();

  content:string;


  constructor(private translate: TranslateService,
    private product_sevice: ProdcutsService,

  ) {

    this.currentLang = this.translate.currentLang;
  }

  ngOnInit() {
    let token: any = (localStorage.getItem('Kaf-token'));
    if (token) {

    // get my point
    this.product_sevice.get_points().subscribe(
      res => {
        this.my_Point = res
      }, err => {
      }
    )




  }


      // get my point
      this.product_sevice.get_points_details().subscribe(
        res => {
          this.content = res.content
        }, err => {
        }
      )

}

}
