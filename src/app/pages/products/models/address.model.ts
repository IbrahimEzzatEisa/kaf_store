export class Address {

  constructor(){
    this.is_default = true,
    this.type ="home"
  }
  id:number
  full_name: string
  phone: number;
  street_address: string
  building_number: number;
  floor_number: number;
  postal_code: number;
  city_id: number;
  district: string;
  is_default:boolean
  type:any
  lat: number;
  lng: number;
  google_address: string;
  full_address:string

}
