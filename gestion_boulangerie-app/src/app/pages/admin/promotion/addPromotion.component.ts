import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../../services/promotion.service';
import { Promotion } from '../../../models/promotion';
import { ProduitService } from '../../../services/produit.service';
import { Produit } from '../../../models/produit';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promotion',
  templateUrl: './addPromotion.component.html',
  styleUrl: './promotion.component.css',
})
export class AddPromotionComponent implements OnInit {

  id!: number;
  produits: Produit[] = [];
  promotions: Promotion[] = []
  ;
  constructor(private promotionService:PromotionService, private produitService:ProduitService, private aRoute: ActivatedRoute) {

   }
ngOnInit(): void {
  this.produitService.getProduits().subscribe((data: any) => {
    this.produits = data;
  });

  if (this.aRoute.snapshot.params['id']) {
    this.id = this.aRoute.snapshot.params['id']; 

  this.promotionService.getPromotionById(this.id).subscribe((res: any) => {
  const datas: Promotion = res.data; 

  this.promoForm.patchValue({
    id: datas.id,
    title: datas.title,
    description: datas.description,
    discount: datas.discount,
    start_date: datas.start_date,
    end_date: datas.end_date,
    active: datas.active,
    product_ids: datas.products ? datas.products.map((p: Produit) => p.id) : []
  });
});


  }
}

  promoForm :FormGroup=new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl('PERCENT', Validators.required),
    discount:  new FormControl('', [Validators.required, Validators.min(0)]),
    start_date:  new FormControl('', Validators.required),
    end_date:  new FormControl('', Validators.required),
    active:  new FormControl(false, Validators.required),
    product_ids:  new FormControl([], Validators.required),
  });

  submit() {
    if(this.id){
      this.promotionService.updatePromotion(this.id,this.promoForm.value).subscribe(
        (data)=>{
          console.log(data);
          alert('Promotion mise à jour avec succès');
        },
        (error)=>{
          console.error('Erreur lors de la mise à jour de la promotion', error);
        }
      )
    }
    else{
    this.promotionService.addPromotion(this.promoForm.value).subscribe(
      (data)=>{
        console.log(data);
        alert('Promotion ajoutée avec succès');
        this.promoForm.reset();
      },
      (error)=>{
        console.error('Erreur lors de l\'ajout de la promotion', error);
      }
    );
    }
}

}
