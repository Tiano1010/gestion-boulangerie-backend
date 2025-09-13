import { Component } from '@angular/core';
import { CategorieService } from '../../../services/categorie.service';
import { Categorie } from '../../../models/categorie';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorie',
  templateUrl: './addCategorie.component.html',
  styleUrl: './categorie.component.css'
})
export class AddCategorieComponent {
  id!: number;
  categories: Categorie[] = [];
  

  constructor(private categorieService: CategorieService, private aRoute: ActivatedRoute) {

   }
  ngOnInit(): void {
      if(this.aRoute.snapshot.params['id']){
          this.id = this.aRoute.snapshot.params['id'];
          if (this.id ) {
            this.categorieService.getCategorieById(this.id).subscribe(
              (datas:Categorie)=> {
                console.log(datas);
                this.CategorieForm.patchValue(
                   {
                     id: datas.id,
                     name: datas.name,
                     description: datas.description,
                    }
                );
              },
              (error) => {
                console.log(error);
              }
            );
          }
        }
      }
  CategorieForm:FormGroup=new FormGroup({
    id:new FormControl(0,),
    name:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
  });
  submit() {
  if(this.id){
    this.categorieService.updateCategorie(this.id,this.CategorieForm.value).subscribe(
      (data) => {
        console.log('Categorie modifiée avec succès', data);
        this.CategorieForm.reset();
      },
      (error) => {
        console.error('Erreur lors de la modification de la categorie', error);
      }
    );
  }
  else{
    this.categorieService.addCategorie(this.CategorieForm.value).subscribe(
      (data) => {
        console.log('Categorie ajoutée avec succès', data);
        this.CategorieForm.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la categorie', error);
      }
    );
  }
}


}
