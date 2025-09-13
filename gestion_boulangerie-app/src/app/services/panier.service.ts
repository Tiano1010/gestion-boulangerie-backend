import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private baseUrl = 'http://localhost:8000/api/panier';

  constructor(private httpClient: HttpClient) {}

  getPanier(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }

  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/add`, { product_id: productId, quantity });
  }

  deleteItem(cartId: number, productId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/remove`, { cart_id: cartId, product_id: productId });
  }

  clearPanier(): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/clear`, {});
  }
}
