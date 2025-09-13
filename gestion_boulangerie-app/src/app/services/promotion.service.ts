import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '../models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private httpClient: HttpClient) {

   }
  url = 'http://localhost:8000/api/promotions';
  getPromotions() {
    return this.httpClient.get<Promotion[]>(this.url);
  }
  addPromotion(promotion: Promotion) {
    return this.httpClient.post<Promotion>(this.url, promotion);
  }
  updatePromotion(id: number, promotion: Promotion) {
    return this.httpClient.put<Promotion>(this.url+'/'+id, promotion);
  }
  deletePromotion(id: number) {
    return this.httpClient.delete(this.url+'/'+id);
  }
  getPromotionById(id: number) {
    return this.httpClient.get<Promotion>(this.url+'/'+id);
  }
}
