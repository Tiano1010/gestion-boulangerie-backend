// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
 selector: 'app-login',
 templateUrl: './login.component.html'
})
export class LoginComponent {
 form: FormGroup;
 constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
 this.form = this.fb.group({
 email: ['', [Validators.required, Validators.email]],
 password: ['', Validators.required]
 });
 }
 login() {
  this.authService.login(this.form.value).subscribe({
    next: (response) => {
      // Au lieu de juste : this.authService.saveToken(response.token);
      // Utilisez :
      this.authService.saveAuthData(response.token, response.user);
      this.router.navigate(['/admin/dashboard']);
    },
    error: (error) => {
      console.error('Erreur de connexion:', error);
    }
  });
}
} 