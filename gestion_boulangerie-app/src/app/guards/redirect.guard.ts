// guards/not-found.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user?.role === 'ADMIN' || user?.role === 'EMPLOYEE') {
      this.router.navigate(['/admin/dashboard']);
    } else if (user?.role === 'CLIENT') {
      this.router.navigate(['/client/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}
