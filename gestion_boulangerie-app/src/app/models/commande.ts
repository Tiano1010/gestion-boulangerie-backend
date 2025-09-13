import { Adresse } from "./adresse";
import { CommandeProduit } from "./commande-produit";

export class Commande {
id!:number;
user_id!:number;
address_id!:number;
total_price!:number;
status!:string;
payment_status!:string;
order_code!:string;
items!: CommandeProduit[];
  address?: Adresse;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
    matricule: string;

  };
}
