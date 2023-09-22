export class WebsiteConfig {

  email: string;
  phone: number;
  tax: number;
  delivery_charge: number;
  logo: string;
  icon: string;
  footer_logo: string;
  maroof_url:string
  terms_and_conditions: string;
  socials: Isocials[]

}

export interface Isocials {
  type: string
  value: string
  class: string
}
