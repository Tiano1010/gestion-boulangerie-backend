import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adresse } from '../models/adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {
  private apiUrl = 'http://localhost:8000/api/addresses';

  constructor(private http: HttpClient) {}

  getUserAdresses() {
    return this.http.get<Adresse[]>(this.apiUrl);
  }

  addAdresse(adresse: Adresse) {
    return this.http.post<Adresse>(this.apiUrl, adresse);
  }

  updateAddress(id: number, adresse: Adresse)  {
    return this.http.put<Adresse>(`${this.apiUrl}/${id}`, adresse);
  }

  deleteAdresse(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
