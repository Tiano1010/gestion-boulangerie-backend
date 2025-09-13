import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion_boulangerie-app';
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
 