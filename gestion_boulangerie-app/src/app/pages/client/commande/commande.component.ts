import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../services/commande.service';
import { Commande } from '../../../models/commande';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commandes',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  commandes: Commande[] = [];
  loading = true;
  error: string | null = null;
  

  constructor(private commandeService: CommandeService,private router: Router) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes() {
    this.loading = true;
    this.error = null;

    this.commandeService.getCommandes().subscribe({
  next: (res: any) => {
    this.loading=false
    this.commandes = res.data; 
  },
  error: (err) => {
    console.error(err);
  }
});
  }
payerCommande(cmd: Commande) {
    this.router.navigate(['/payment', cmd.id]); // ✅ redirection vers page paiement
  }

}
