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
  // Variables para el inicio de sesión con los nombres exactos de las tablas de la base de datos.
  email: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {} 

  // No se utilzo guard ni tokens ya que nos enfocamos mas en las funcionalidades de un Crud en backend y frontend como hemos visto en clase.

  onSubmit() {
    // Llamado al servicio user.services y enviado el objeto user para iniciar sesión en la base de datos.
    // Se utiliza el método getUsersLogin para obtener los datos del usuario.
    this.userService.getUsersLogin({ correo: this.email, contra: this.password }).pipe(
      tap((response) => {
        console.log('Login response:', response);
        // Manejo de la respuesta del servicio en consola con el proposito de debugging
        // Si la respuesta es 'ok', se redirige a la página de inicio de sesión
        // Si la respuesta no es 'ok', se muestra un mensaje de error
        if (response.usuariosEstado === true) {
          console.log(response.usuariosNombre);
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