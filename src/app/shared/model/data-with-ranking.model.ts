export class DataWithRanking <T>{
  data: T[];
  paginator? : IPaginator
  totalPagesCount?:number;
  pageIndex?:number;
  totalItemCount?:number;
  pageSize: number

}
export interface IPaginator{
pageSize: number,
totalItemCount: number,
totalPagesCount: number,
pageIndex: number,

}
