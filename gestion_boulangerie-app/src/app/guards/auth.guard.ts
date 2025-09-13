import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private lastBlockedUrl: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private location: Location
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUrl = state.url;

    // 🔒 Vérification si connecté
    if (!this.auth.isLoggedIn()) {
      if (this.lastBlockedUrl !== currentUrl) {
        this.lastBlockedUrl = currentUrl;
        alert("⚠️ Vous devez vous connecter pour accéder à cette page !");
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 100);
      }
      return false;
    }

    // 🎭 Vérification du rôle
    const requiredRoles = route.data['roles'] as string[];
    const userRole = this.auth.getUserRole();

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      if (this.lastBlockedUrl !== currentUrl) {
        this.lastBlockedUrl = currentUrl;
        alert(`⛔ Accès refusé : rôle requis (${requiredRoles.join(', ')}), vous êtes ${userRole}`);
        setTimeout(() => {
          this.location.back();  // ✅ Retourne à la page précédente
        }, 100);
      }
      return false;
    }

    this.lastBlockedUrl = '';
    return true;
  }
}
