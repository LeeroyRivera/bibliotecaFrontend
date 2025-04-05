import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string) {
    // Lógica de autenticación simple
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}