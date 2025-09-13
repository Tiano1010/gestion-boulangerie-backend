import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../models/commande';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private url = "http://localhost:8000/api/orders";

  constructor(private http: HttpClient) {}

  getCommandes() {
    return this.http.get< Commande[]>(this.url);
  }

  getCommandeById(id: number) {
    return this.http.get< Commande>(`${this.url}/${id}`);
  }

  addCommande(order: any) {
    return this.http.post< Commande>(this.url, order);
  }
   updateCommandeStatus(id: number, status: string) {
  return this.http.patch<{ data: Commande }>(
    `${this.url}/${id}/status`,
    { status }
  );
}
  cancelCommande(id: number) {
    return this.http.post< Commande>(`${this.url}/${id}/cancel`, {});
  }
updatePaymentStatus(orderId: number, status: string) {
  return this.http.patch(`${this.url}/${orderId}/payment-status`, {
    payment_status: status
  });
}

}
