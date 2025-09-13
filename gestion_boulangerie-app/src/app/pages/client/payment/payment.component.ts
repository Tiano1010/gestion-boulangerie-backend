import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Commande } from '../../../models/commande';
import { CommandeService } from '../../../services/commande.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
 paiementForm!: FormGroup;
  commande!: Commande;
  loading = true;
  error = '';
  id!: number ;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private commandeService: CommandeService,
    private router: Router
  ) {}

 ngOnInit(): void {
  // récupération de l'id passé dans l'URL
  const idParam = this.route.snapshot.paramMap.get('id');
  this.id = idParam ? +idParam : 0;

  if (this.id) {
    this.commandeService.getCommandeById(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.commande = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger la commande';
        this.loading = false;
      }
    });
  }

  this.paiementForm = this.fb.group({
    cardName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    expiry: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
  });
}

  payer() {
  if (this.paiementForm.invalid) {
    console.error('Formulaire invalide');
    return;
  }

this.commandeService.updatePaymentStatus(this.id, 'PAYÉ').subscribe({
  next: (res: any) => {
    this.commande = res.data; // ✅ assigner la bonne donnée
    alert('✅ Paiement validé avec succès !');
    this.genererFacturePDF(this.commande); 
    this.router.navigate(['/commandes']);
  },
  error: () => {
    this.error = 'Erreur lors du paiement';
  }
});

}



genererFacturePDF(commande: Commande) {
  if (!commande || !commande.items) {
    console.error('❌ Commande ou items manquants');
    return;
  }

  const doc = new jsPDF();

  // ✅ Titre
  doc.setFontSize(18);
  doc.text('Facture de commande', 14, 20);

  // ✅ Infos commande
  doc.setFontSize(12);
  doc.text(`Commande ID: ${commande.id}`, 14, 30);
  doc.text(`Code commande: ${commande.order_code || ''}`, 14, 38);
  doc.text(
    `Client: ${commande.user?.name || ''}   )`,
    14,
    46
  );
  doc.text('Email: ' + (commande.user?.email || ''), 14, 46);
  doc.text(
    `Matricule client: ${commande.user?.matricule || 'N/A'}`,
    14,
    54
  );
  doc.text(
    `Adresse: ${commande.address?.street || ''}, ${commande.address?.city || ''}`,
    14,
    62
  );
  doc.text(`Statut: ${commande.status}`, 14, 70);
  doc.text(`Paiement: ${commande.payment_status}`, 14, 78);

  // ✅ Tableau des articles
  autoTable(doc, {
    startY: 90,
    head: [['Produit', 'Prix (CFA)', 'Quantité', 'Sous-total']],
    body: commande.items.map((item) => [
      item.product?.name || '',
      (item.product?.price ?? 0).toString(),
      (item.quantity ?? 0).toString(),
      ((item.product?.price ?? 0) * (item.quantity ?? 0)).toString(),
    ]),
  });

  // ✅ Total
  const finalY = (doc as any).lastAutoTable.finalY || 100; // position du tableau
  doc.setFontSize(14);
  doc.text(`Total: ${commande.total_price ?? 0} CFA`, 14, finalY + 10);

  // ✅ Afficher / télécharger le PDF
  doc.save(`facture_commande_${commande.order_code || commande.id}.pdf`);
}

}