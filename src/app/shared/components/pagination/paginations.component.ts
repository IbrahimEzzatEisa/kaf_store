import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-paginations',
  templateUrl: './paginations.component.html',
  styleUrls: ['./paginations.component.css']
})
export class PaginationsComponent implements OnInit {

  _page: number;
  next:number = 1
  pageSelected:any;

  Previous: string;
  nextOne: string;
  // store language type to check it
  language: string| null;
  ar: boolean;




  @Input()
  set page(page: number) {
    this._page = page || 1;
  }

  _size: number;
  @Input()
  set size(numberOfPages:any) {
    this._size = numberOfPages;
  }

  @Output() onChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

    // switch language and change style
    this.language = localStorage.getItem('lang')
    if (this.language === 'ar') {
      this.Previous = "السابق";
      this.nextOne = "التالى"


      this.ar = true;
    } else {
      this.ar = false;
      this.Previous = "Previous";
      this.nextOne = "Next"


    }
  }

  changePage(page: number) {
  if( page<1 || page>this._size) return;
    this.onChange.emit(page);
  }

}
