import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  usuariosNombre: string = '';
  usuariosCorreo: string = '';
  usuariosContra: string = '';

  constructor(private router: Router, private userService: UserService) {
  
  }

  register() {
    const user = {
      usuariosNombre: this.usuariosNombre,
      usuariosCorreo: this.usuariosCorreo,
      usuariosContra: this.usuariosContra
    };
    this.userService.addUser(user).pipe(
      tap((response) => {
        console.log('Register response:', response);
        if (response.msg === 'ok') {
          alert('Usuario registrado correctamente');
          this.router.navigate(['login']);
        } else {
          alert('Error al registrar el usuario');
        }
      })
    ).subscribe();
  }
}
