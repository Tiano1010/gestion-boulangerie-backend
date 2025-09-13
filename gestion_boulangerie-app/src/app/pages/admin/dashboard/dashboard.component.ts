import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ProduitService } from '../../../services/produit.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Commande } from '../../../models/commande';
import { CommandeService } from '../../../services/commande.service';
import { Produit } from '../../../models/produit';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    produits: 0,
    commandes: 0,
    clients: 0,
    revenus: 0
  };

  produitsRupture: Produit[] = [];
  commandesNonValides: Commande[] = [];

  constructor(
    private authservice: AuthService,
    private produitService: ProduitService,
    private utilisateurService: UtilisateurService,
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadCommandes();
    this.loadStats();

    const menuToggle = document.getElementById("menu-toggle");
    const wrapper = document.getElementById("wrapper");

    if (menuToggle && wrapper) {
      menuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        wrapper.classList.toggle("toggled");
      });
    }
  }

  logout(): void {
    this.authservice.logout();
    window.location.href = '/login';
  }

  /** ✅ Helper pour convertir en nombre */
  private toNumber(v: any): number {
    if (typeof v === 'number') return v;
    const n = parseFloat(String(v).replace(/\s/g, ''));
    return isNaN(n) ? 0 : n;
  }

  /** 🔹 Charger uniquement les stats globales */
  loadStats() {
    // Produits
    this.produitService.getProduits().subscribe({
      next: (data) => this.stats.produits = data.length,
      error: (err) => console.error(err)
    });

    // Commandes & Revenus
    this.commandeService.getCommandes().subscribe({
      next: (data: Commande[]) => {
        this.stats.commandes = data.filter(c => c.status === 'VALIDER').length;
        this.stats.revenus = data
          .filter(c => c.payment_status === 'PAYÉ')
          .reduce((total, c) => total + this.toNumber(c.total_price), 0);
      },
      error: (err) => console.error(err)
    });

    // Clients
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (users) => {
        this.stats.clients = users.filter(u => u.role === 'CLIENT').length;
      },
      error: (err) => console.error('Erreur users', err)
    });
  }

  /** 🔹 Produits en rupture */
  loadProduits() {
    this.produitService.getProduits().subscribe({
      next: (res) => {
        this.produitsRupture = res.filter((p: any) => p.stock === 0);
      },
      error: () => {
        this.produitsRupture = [];
      }
    });
  }

  /** 🔹 Commandes non validées + recalcul revenus */
  loadCommandes() {
    this.commandeService.getCommandes().subscribe({
      next: (res) => {
        this.commandesNonValides = res.filter((c: any) => c.status === 'EN_ATTENTE');
        this.stats.revenus = res
          .filter(c => c.payment_status === 'PAYÉ')
          .reduce((total, c) => total + this.toNumber(c.total_price), 0);
      },
      error: () => {
        this.commandesNonValides = [];
      }
    });
  }

  /** 🔹 Mise à jour statut commande */
  updateStatus(commande: Commande, newStatus: string) {
    if (newStatus === 'VALIDER' && commande.payment_status !== 'PAYÉ') {
      alert("⚠️ Impossible de valider : paiement non validé !");
      return;
    }

    this.commandeService.updateCommandeStatus(commande.id, newStatus).subscribe({
      next: (res) => {
        commande.status = res.data.status; // ✅ maj locale
        alert(`✅ Commande ${commande.order_code} mise à jour en ${newStatus}`);
      },
      error: () => {
        alert("❌ Échec de la mise à jour du statut !");
      }
    });
  }
}
