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
  //variables para el registro de usuario con los nombres exactos de las tablas de la base de datos.
  usuariosNombre: string = '';
  usuariosCorreo: string = '';
  usuariosContra: string = '';

  constructor(private router: Router, private userService: UserService) {
  
  }

  register() {
    
    const user = {
      // Asignar los valores de los campos a las propiedades del objeto user
      usuariosNombre: this.usuariosNombre,
      usuariosCorreo: this.usuariosCorreo,
      usuariosContra: this.usuariosContra
    };
    //llamado al servicio user.services y enviado el objeto user para registrar el usuario en la base de datos.
    this.userService.addUser(user).pipe(
      tap((response) => {
        // Manejo de la respuesta del servicio en consola con el proposito de debugging
        console.log('Register response:', response);
        // Si la respuesta es 'ok', se redirige a la página de inicio de sesión
        // Si la respuesta no es 'ok', se muestra un mensaje de error
        if (response.msg === 'ok') {
          alert('Usuario registrado correctamente');
          this.router.navigate(['login']);
        } else {
          alert('Error al registrar el usuario');
        }
      })
    ).subscribe();// Se suscribe al observable para que se ejecute la petición
  }
}
