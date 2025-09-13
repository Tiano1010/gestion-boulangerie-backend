import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../models/produit';
import { Promotion } from '../../../models/promotion';
import { ProduitService } from '../../../services/produit.service';
import { PromotionService } from '../../../services/promotion.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  produits: Produit[] = [];
  promotions: Promotion[] = [];

  // 👉 base URL des images (à adapter selon ton backend)
  baseUrl: string = 'http://localhost:8000/storage/produits/';

  constructor(
    private produitService: ProduitService,
    private promotionService: PromotionService
  ) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe((prods: Produit[]) => {
      this.promotionService.getPromotions().subscribe((promos: Promotion[]) => {
        this.promotions = promos;

        this.produits = prods.map((p) => {
          // corriger le chemin de l’image si nécessaire
          if (p.image_url && !p.image_url.startsWith('http')) {
            p.image_url = this.baseUrl + p.image_url;
          }

          // appliquer une promotion si le produit est concerné
          const promo = this.promotions.find(pr => pr.product_ids?.includes(p.id) && pr.active);
          if (promo) {
            if (promo.type === 'PERCENT') {
              p.prixFinal = p.price - (p.price * promo.discount) / 100;
            } else if (promo.type === 'FIXE') {
              p.prixFinal = Math.max(p.price - promo.discount, 0);
            }
          } else {
            p.prixFinal = p.price;
          }
          return p;
        });
      });
    });
  }
}
