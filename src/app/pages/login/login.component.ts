import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UserService],
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {} 

  onSubmit() {
    this.userService.getUsersLogin({ correo: this.email, contra: this.password }).pipe(
      tap((response) => {
        console.log('Login response:', response);
        if (response.usuariosEstado === true) {
          localStorage.setItem('user', JSON.stringify(response.usuariosNombre));
          this.router.navigate(['home']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
    ).subscribe();
  }

  toRegister() {
    this.router.navigate(['registro']);
  }
}