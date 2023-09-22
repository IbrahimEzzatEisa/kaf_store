export class CheckOrder {

  constructor(){
    this.wallet_used = false
  }

  address_id: number;
  coupon_id: number;
  products: Iproducts[];
  payment_method_used: boolean;
  payment_method: string;
  wallet_used: boolean;

}

export interface Iproducts {
  product_id: number
  quantity: number
}
