export class FilterParams {
  constructor() {
    this.pageNumber = 1;
    this.pageSize = 1;
    this.type_id = "";
    this.type = "";
    this.filter =""
    this.sort = ""

  }
  pageNumber: number | any;
  pageSize: number | any;
  filter: string | any;
  sort: string | any;
  type_id:number | any;
  type:String;



}



