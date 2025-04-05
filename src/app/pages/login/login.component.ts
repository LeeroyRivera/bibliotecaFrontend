import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <input type="text" [(ngModel)]="username" placeholder="Usuario">
        <input type="password" [(ngModel)]="password" placeholder="Contraseña">
        <button type="submit">Ingresar</button>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
    }
    input, button {
      width: 100%;
      padding: 0.5rem;
      margin: 0.5rem 0;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.username, this.password);
    this.router.navigate(['/home']);
  }
}