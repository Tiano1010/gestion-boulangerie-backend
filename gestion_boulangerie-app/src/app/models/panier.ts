import { PanierProduit } from "./panier-produit";

export class Panier {
     id!: number;
  user_id!: number;
  est_actif!: boolean;
 items!: PanierProduit[]; 
   total?: number;
}
