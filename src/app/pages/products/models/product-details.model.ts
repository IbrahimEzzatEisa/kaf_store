export class ProductDetails {


  id: number
  title: number
  small_description: string
  quantity: number
  crop: string
  envelope: string
  cup: string
  price: number
  old_price: number
  is_fav: number
  main_image: string
  created_at: string;
  qty:number;
  description:string
  totalPrice:number
  simillar_products:Isimillar_products[]
  images:Iimages[]
}

 export interface Isimillar_products {
  id: number;
  title: string;
  small_description: string;
  quantity: number;
  crop: string;
  envelope: string;
  cup: string;
  price: number;
  old_price: number;
  is_fav: number;
  main_image: string;
  qty:number
}
export interface Iimages {
  id: number;
 image:string
}
