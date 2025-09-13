import { Promotion } from "./promotion";

export class Produit {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    stock!: number;
    category_id!: string;
    image_url?: string;
  Order?: Promotion[];


    prixFinal?: number;
}
