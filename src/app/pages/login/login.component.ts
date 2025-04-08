import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  onSubmit() {
    // Lógica de autenticación aquí
    console.log('Usuario:', this.username, 'Contraseña:', this.password);
    
    // Ejemplo de validación básica
    if (!this.username || !this.password) {
      this.errorMessage = 'Usuario y contraseña son requeridos';
      return;
    }
    
    // Aquí iría la llamada a tu servicio de autenticación
  }
}