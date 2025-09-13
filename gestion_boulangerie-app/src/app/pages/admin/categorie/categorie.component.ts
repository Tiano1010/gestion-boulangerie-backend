import { Component } from '@angular/core';
import { CategorieService } from '../../../services/categorie.service';
import { Categorie } from '../../../models/categorie';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent {

  categories: Categorie[] = [];

  constructor(private categorieService: CategorieService) {

   }
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categorieService.getCategories().subscribe(
    (data:Categorie[] )=> {
      this.categories = data;
      console.log(this.categories);
    },
      (error: any) => {
        console.error('Erreur lors de la récupération des categories', error);
      }
    )

    
  }
  deleteCategorie(id: number) {
    this.categorieService.deleteCategorie(id).subscribe(
      () => {
        console.log('Categorie supprimée avec succès');
        this.getCategories(); // Rafraîchir la liste des categories
      },
      (error) => {
        console.error('Erreur lors de la suppression de la categorie', error);
      }
    );
  }

}
