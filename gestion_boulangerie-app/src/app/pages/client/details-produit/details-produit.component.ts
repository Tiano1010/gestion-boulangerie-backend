import { Component, Input, OnInit } from '@angular/core';
import { ProduitService } from '../../../services/produit.service';
import { ActivatedRoute } from '@angular/router';
import { PanierService } from '../../../services/panier.service';
import { Produit } from '../../../models/produit';
import { CommandeService } from '../../../services/commande.service';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrl: './details-produit.component.css'
})
export class DetailsProduitComponent implements OnInit {

 @Input() produit!: Produit;
  
  Description!: string;
  Price!: number;
  Name!: string;
  id!: number;
  image!: string;
  quantite: number = 1; // quantité par défaut


  constructor(
    private produitService: ProduitService,
    private aRoute: ActivatedRoute,
    private panierService: PanierService,
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    this.getProduitDetails();
  }

  getProduitDetails() {
    if (this.aRoute.snapshot.params['id']) {
       this.id = this.aRoute.snapshot.params['id'];
      this.produitService.getProduitById(this.id).subscribe((data) => {
        this.Description = data.description;
        this.Price = data.price;
        this.Name = data.name;
        this.image = '' + data.image_url;
      });
    }
            console.log(this.id)


  }

  ajouterAuPanier() {
    if (this.quantite < 1) {
      alert("Veuillez entrer une quantité valide !");
      return;
    }
    this.panierService.addToCart(this.id,this.quantite).subscribe(
      ()=>{
        console.log(this.id)
         alert(`${this.quantite} x ${this.Name} ajouté(s) au panier 🛒`);
      },
      (error)=>{
        alert("Erreur lors de l'ajout du produit")
      }
    )

  }

   commanderProduit() {
    const commande = {
      user_id: 1,  // à remplacer par l’utilisateur connecté
      total: this.produit.price * this.quantite,
      status: 'en attente',
      produits: [
        { product_id: this.produit.id, quantity: this.quantite }
      ]
    };

    this.commandeService.addCommande(commande as any).subscribe({
      next: (res) => alert("Commande ajoutée avec succès ✅"),
      error: (err) => console.error("Erreur ajout commande", err)
    });
  }
}
