import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  form: FormGroup;
  usuariosNombre: string = '';
  usuariosCorreo: string = '';
  usuariosContra: string = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      usuariosNombre: [''],
      usuariosCorreo: [''],
      usuariosContra: [''],
    });
  }

  register() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form Data:', formData);
      // Aquí puedes enviar los datos del formulario a tu API o realizar otras acciones
    }
  }
}
