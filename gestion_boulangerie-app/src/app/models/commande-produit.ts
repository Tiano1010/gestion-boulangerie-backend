import { Produit } from "./produit";

export class CommandeProduit {
id!:number;
order_id!:number;
product_id!:number;
quantity!:number;
price!:number;
 product?: Produit;
    
}
