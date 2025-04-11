import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loans-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.css']
})
export class LoansFormComponent implements OnInit {
  @Output() submitLoan = new EventEmitter<any>();
  
  loanForm = new FormGroup({
    libro: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    usuario: new FormControl({ value: '', disabled: true }, Validators.required),
    prestamoFechaInicial: new FormControl('', Validators.required),
    prestamoFechaDevolucion: new FormControl('', Validators.required),
    prestamoEstado: new FormControl('PENDIENTE', Validators.required)
  });

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    try {
      const storedUser = localStorage.getItem('user');
      console.log(storedUser);
      if (storedUser && storedUser !== 'undefined') {
        const username = JSON.parse(storedUser);
        this.loanForm.patchValue({
          usuario: username
        });
      } else {
        console.warn('No se encontró usuario en localStorage');
        this.loanForm.patchValue({
          usuario: 'Usuario no identificado'
        });
      }
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
      this.loanForm.patchValue({
        usuario: 'Error al cargar usuario'
      });
    }
  }

  onSubmit() {
    if (this.loanForm.valid) {
      this.loanForm.get('usuario')?.enable();
      const formValue = this.loanForm.value;
      this.loanForm.get('usuario')?.disable();
      
      this.submitLoan.emit(formValue);
      this.resetForm();
    }
  }

  resetForm() {
    this.loanForm.reset({
      prestamoEstado: 'PENDIENTE'
    });
    this.loadUser(); // Recargar el usuario después del reset
    this.loanForm.get('usuario')?.disable();
  }

  get libro() { return this.loanForm.get('libro'); }
}