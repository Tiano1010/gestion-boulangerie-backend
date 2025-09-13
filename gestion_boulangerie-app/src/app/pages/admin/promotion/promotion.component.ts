import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../../services/promotion.service';
import { Promotion } from '../../../models/promotion';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent implements OnInit {
  promotions: Promotion[] = [];
  constructor(private promotionService:PromotionService) {

   }
  ngOnInit(): void {
    this.getPromotions();
  }
  getPromotions(){
    this.promotionService.getPromotions().subscribe(
(data:Promotion[])=>{
  this.promotions=data;
  console.log(this.promotions);
},
(error)=>{
  console.error('Erreur lors de la récupération des promotions', error);
}
    );
  }
deletePromotion(id:number){
  this.promotionService.deletePromotion(id).subscribe(
    ()=>{
      console.log('Promotion supprimée avec succès');
      this.getPromotions(); // Rafraîchir la liste des promotions
    },
    (error)=>{
      console.error('Erreur lors de la suppression de la promotion', error);
    }
  );
}

}
