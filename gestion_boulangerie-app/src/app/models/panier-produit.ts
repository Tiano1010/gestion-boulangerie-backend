import { Produit } from "./produit";

export class PanierProduit {
     id!: number;
  panier_id!: number;
  product_id!: number;
  quantity!: number;
  product?: Produit;
}
