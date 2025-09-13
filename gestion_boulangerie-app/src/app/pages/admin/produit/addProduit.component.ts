import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../../../services/produit.service';
import { Produit } from '../../../models/produit';

@Component({
  selector: 'app-product',
  templateUrl: './addProduit.component.html',
  styleUrls: ['./produit.component.css']
})
export class AddProduitComponent implements OnInit {
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile!: File;
  id!: number;

  constructor(
    private produitService: ProduitService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.aRoute.snapshot.params['id']) {
      this.id = +this.aRoute.snapshot.params['id'];

      this.produitService.getProduitById(this.id).subscribe(
        (datas: Produit) => {
          this.productForm.patchValue({
            id: datas.id,
            name: datas.name,
            description: datas.description,
            category_id: datas.category_id,
            price: datas.price,
            stock: datas.stock
          });

          if (datas.image_url) {
            this.imagePreview = 'http://localhost:8000/storage/' + datas.image_url;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  productForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    category_id: new FormControl(0, Validators.required),
  });

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  submit() {
    if (this.id) {
      this.produitService.updateProduit(this.id, this.productForm.value, this.selectedFile)
        .subscribe(
          (response) => {
            console.log('Produit mis à jour avec succès', response);
            this.router.navigateByUrl('/admin/produit');
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du produit', error);
          }
        );
    } else {
      this.produitService.addProduit(this.productForm.value, this.selectedFile)
        .subscribe(
          () => {
            console.log('Produit ajouté avec succès');
            this.router.navigateByUrl('/admin/produit');
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du produit', error);
          }
        );
    }
  }
}
