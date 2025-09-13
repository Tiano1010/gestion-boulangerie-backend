import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../../services/produit.service';
import { Produit } from '../../../models/produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {

  produits: Produit[] = [];
  constructor(private produitService: ProduitService) {

  }
  ngOnInit(): void {
    this.getProduits();
  }

  getProduits() {
  
    this.produitService.getProduits().subscribe((data: Produit[]) => {
      this.produits = data;
      console.log(this.produits);
    },
      (error) => {
        console.error('Erreur lors de la récupération des produits', error);
      }
  );
  }
  
  deleteProduit(id: number) {
    this.produitService.deleteProduit(id).subscribe(
      () => {
        console.log('Produit supprimé avec succès');
        this.getProduits(); // Rafraîchir la liste des produits
      },
      (error) => {
        console.error('Erreur lors de la suppression du produit', error);
      }
    );
  }
}
