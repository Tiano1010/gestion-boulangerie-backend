import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../services/commande.service';
import { Commande } from '../../../models/commande';

@Component({
  selector: 'app-commande',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class AdminCommandeComponent implements OnInit {

  searchCode: string = '';
  commandes: Commande[] = [];
  loading = true;
  error: string | null = null;

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

loadCommandes() {
  this.loading = true;
  this.error = null;

  this.commandeService.getCommandes().subscribe({
    next: (res) => {
      this.commandes = res; // ✅ on prend bien le tableau
      console.log(this.commandes);
      this.loading = false;
    },
    error: () => {
      this.error = "Impossible de charger les commandes.";
      this.loading = false;
    }
  });
}

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


get commandesFiltrees(): Commande[] {
  if (!this.searchCode) return this.commandes;
  return this.commandes.filter(c =>
    c.order_code.toLowerCase().includes(this.searchCode.toLowerCase())
  );
}
}
