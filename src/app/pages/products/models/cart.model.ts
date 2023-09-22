export class Cart {
  products:Iproducts[]
}

export interface Iproducts {
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
  qty:number
}
