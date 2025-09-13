// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ 
  providedIn: 'root' 
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api';
  
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<{ token: string, user: any }>(`${this.baseUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post<{ token: string, user: any }>(`${this.baseUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers: this.getHeaders() });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // 🔧 Nouvelle méthode pour sauvegarder les données utilisateur
  saveUserData(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  // 🔧 Méthode combinée pour sauvegarder token + données utilisateur
  saveAuthData(token: string, userData: any) {
    this.saveToken(token);
    this.saveUserData(userData);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getHeaders() {
    return {
      Authorization: 'Bearer ' + this.getToken()
    };
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string {
    const user = localStorage.getItem('user');
    
    // 🐛 DEBUG
    
    if (!user) {
      return '';
    }

    try {
      const userData = JSON.parse(user);
      
      // ⚠️ ADAPTEZ SELON LA STRUCTURE DE VOS DONNÉES
      return userData.role || userData.user_role || '';
    } catch (error) {
      return '';
    }
  }

  getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}