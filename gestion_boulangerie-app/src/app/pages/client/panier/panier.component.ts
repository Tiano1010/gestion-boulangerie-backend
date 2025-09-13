import { Component, OnInit } from '@angular/core';
import { PanierService } from '../../../services/panier.service';
import { Panier } from '../../../models/panier';
import { CommandeService } from '../../../services/commande.service';
import { Adresse } from '../../../models/adresse';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier: Panier = { id: 0, user_id: 0, est_actif: true, items: [], total: 0 };
  loading = true;
  error: string | null = null;
    addresses: Adresse[] = [];
  selectedAdresse: Adresse | null = null;

  constructor(private panierService: PanierService,private commandeService:CommandeService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
    this.error = null;

    this.panierService.getPanier().subscribe({
      next: (data) => {
        this.panier = data;
        this.recalculerTotal();
        this.loading = false;
      },
      error: (err) => {
        this.error = "Impossible de charger le panier.";
        console.error(err);
        this.loading = false;
      }
    });
  }

  removeItem(productId: number) {
    this.panierService.deleteItem(this.panier.id, productId).subscribe({
      next: () => {
        this.panier.items = this.panier.items.filter(p => p.product_id !== productId);
        this.recalculerTotal();
      },
      error: (err) => {
        this.error = "Erreur lors de la suppression de l'article.";
        console.error(err);
      }
    });
  }

  clearPanier() {
    this.panierService.clearPanier().subscribe({
      next: () => {
        this.panier.items = [];
        this.recalculerTotal();
      },
      error: (err) => {
        this.error = "Erreur lors de la vidange du panier.";
        console.error(err);
      }
    });
  }

  private recalculerTotal() {
    this.panier.total = this.panier.items.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
  }

commanderPanier() {
  if (!this.selectedAdresse) {
    alert("Veuillez sélectionner une adresse avant de commander.");
    return;
  }

  const commande = {
    address_id: this.selectedAdresse.id,
    items: this.panier.items.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity
    }))
  };

  this.commandeService.addCommande(commande as any).subscribe({
    next: (res) => {
      alert("Commande passée avec succès ✅");
      this.clearPanier(); // vider le panier après commande
    },
    error: (err) => {
      console.error("Erreur lors de la commande", err);
      this.error = "Impossible de passer la commande.";
    }
  });
}

onAdresseChoisie(addr: Adresse) {
  this.selectedAdresse = addr;
  console.log("Adresse choisie :", addr);
}

}
