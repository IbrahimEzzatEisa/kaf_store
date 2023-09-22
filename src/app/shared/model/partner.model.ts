export class Partners {
  ourClientDescription?: string;
  ourClientTitle?: string;
  ourClientsData?: IourClientsData[]
}

export interface IourClientsDescription {
  ourClientDescriptionAr: string;
  ourClientDescriptionEn: string;
}


export interface IourClientsData {
  id: number;
  link: string;
  imagePath: string;
}




