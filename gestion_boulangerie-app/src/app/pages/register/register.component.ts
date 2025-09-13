// src/app/pages/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
 selector: 'app-register',
 templateUrl: './register.component.html'
})
export class RegisterComponent {
 form: FormGroup;
 constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
 this.form = this.fb.group({
 name: ['', Validators.required],
 email: ['', [Validators.required, Validators.email]],
 password: ['', Validators.required],
 password_confirmation: ['', Validators.required]
 });
 }
 register() {

 if (this.form.valid) {
 this.auth.register(this.form.value).subscribe({
 next: (res) => {
 this.auth.saveToken(res.token);
 this.router.navigate(['/po']);
 },
 error: err => console.error(err)
 });
 } 
 }
}
