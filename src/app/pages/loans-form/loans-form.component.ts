import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loans-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.css']
})
export class LoansFormComponent {
  @Output() submitLoan = new EventEmitter<any>();

  loanForm = new FormGroup({
    libro: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    usuario: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    prestamoFechaInicial: new FormControl('', Validators.required),
    prestamoFechaDevolucion: new FormControl('', Validators.required),
    prestamoEstado: new FormControl('PENDIENTE', Validators.required)
  });

  onSubmit() {
    if (this.loanForm.valid) {
      this.submitLoan.emit(this.loanForm.value);
      this.loanForm.reset({
        prestamoEstado: 'PENDIENTE'
      });
    }
  }

  get libro() { return this.loanForm.get('libro'); }
  get usuario() { return this.loanForm.get('usuario'); }
}