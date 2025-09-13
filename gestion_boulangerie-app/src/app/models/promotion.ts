import { Produit } from "./produit";

export class Promotion {
  id!: number;
  title!: string;
  description!: string;
  discount!: number;
  type!: string;
  start_date!: string;
  end_date!: string;
  active!: boolean;
 product_ids?: number[];   // optionnel si backend ne l’envoie pas
  products?: Produit[];  
}
