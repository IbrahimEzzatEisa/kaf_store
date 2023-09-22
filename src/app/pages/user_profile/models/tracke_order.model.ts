export class TrackOrder {
  data: Idata;
  trackings: Itrackings[]
}

export interface Idata {
  number: string
  date: string
  products_number: string
  final_total: string

}
export interface Itrackings {
  title: string
  description: string
  order_status: string
  created_at: string;
}

