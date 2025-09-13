import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
    url = 'http://localhost:8000/api/categories';


  constructor(private httpCient: HttpClient) {

   }
  getCategories() {
    return this.httpCient.get<Categorie[]>(this.url);
  }
  addCategorie(categorie: Categorie) {
    return this.httpCient.post<Categorie>(this.url, categorie);
  }
  updateCategorie(id: number, categorie: any) {
    return this.httpCient.put<Categorie>(this.url+'/'+id, categorie);
  } 
  deleteCategorie(id: number) {
    return this.httpCient.delete<Categorie>(this.url+'/'+id);
  }
  getCategorieById(id: number) {
    return this.httpCient.get<Categorie>(this.url+'/'+id);
  }
}
