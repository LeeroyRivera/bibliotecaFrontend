import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  showPassword: boolean = false;

  onSubmit(): void {
    // Lógica de autenticación
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    
    // Ejemplo de manejo de errores
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor ingresa usuario y contraseña';
      return;
    }
    
    // Aquí iría la llamada al servicio de autenticación
    // this.authService.login(this.username, this.password).subscribe(...)
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.showPassword ? 'text' : 'password';
    }
  }
}