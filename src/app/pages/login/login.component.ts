import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {} 

  onSubmit() {
    console.log('Login attempt with:', {
      email: this.email,
      password: this.password,
    });
    // Aquí iría la lógica de autenticación
  }

  toRegister() {
    this.router.navigate(['registro']);
  }
}