import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private httpCLient: HttpClient) {
    
   }
  url = 'http://localhost:8000/api/users';
  getUtilisateurs() {
    return this.httpCLient.get<Utilisateur[]>(this.url);
  }
  addUtilisateur(utilisateur: Utilisateur) {
    return this.httpCLient.post<Utilisateur>(this.url, utilisateur);
  }
  updateUtilisateur(id: number, utilisateur: Utilisateur) {
    return this.httpCLient.put<Utilisateur>(this.url+'/'+id, utilisateur);
  }
  deleteUtilisateur(id: number) {
    return this.httpCLient.delete(this.url+'/'+id);
  }
  getUtilisateurById(id: number) {
    return this.httpCLient.get<Utilisateur>(this.url+'/'+id);
  }
  getCurrentUser() {
  return this.httpCLient.get<Utilisateur>('http://localhost:8000/api/user');
}

}
