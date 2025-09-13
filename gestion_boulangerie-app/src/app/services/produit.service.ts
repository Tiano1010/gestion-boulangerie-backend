import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  url = 'http://localhost:8000/api/products';

  constructor(private httpClient: HttpClient) {}

  // Liste
  getProduits() {
    return this.httpClient.get<Produit[]>(this.url);
  }

  // Ajout avec image
  addProduit(produit: any, file?: File) {
    const formData = new FormData();
    formData.append('name', produit.name);
    formData.append('description', produit.description);
    formData.append('price', produit.price);
    formData.append('category_id', produit.category_id);
    formData.append('stock', produit.stock);
    if (file) {
      formData.append('image', file);
    }

    return this.httpClient.post<Produit>(this.url, formData);
  }

  // Modification avec image
  updateProduit(id: number, produit: any, file?: File) {
    const formData = new FormData();
    formData.append('name', produit.name);
    formData.append('description', produit.description);
    formData.append('price', produit.price);
    formData.append('category_id', produit.category_id);
    formData.append('stock', produit.stock);
    if (file) {
      formData.append('image', file);
    }

    // Laravel accepte PUT via POST + _method
    formData.append('_method', 'PUT');

    return this.httpClient.post<Produit>(`${this.url}/${id}`, formData);
  }

  // Suppression
  deleteProduit(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  // Récupération par ID
  getProduitById(id: number) {
    return this.httpClient.get<Produit>(`${this.url}/${id}`);
  }
}
