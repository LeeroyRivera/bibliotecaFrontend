import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
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
    console.log('User registered:', user);
  }
    // Aquí puedes agregar la lógica para enviar el usuario al servidor o realizar otras acciones necesarias.
}
