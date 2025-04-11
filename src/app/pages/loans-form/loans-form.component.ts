import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { Router } from '@angular/router';
import { BooksDataService } from '../../services/books-data.service';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-loans-form',
  providers: [BooksDataService, LoanService, UserService],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.css']
})
export class LoansFormComponent implements OnInit {
  @Output() submitLoan = new EventEmitter<any>();
  isSubmitting: boolean = false;
  submitError: string | null = null;
  
  loanForm = new FormGroup({
    libro: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    usuario: new FormControl({ value: '', disabled: true }, Validators.required),
    prestamoFechaInicial: new FormControl('', Validators.required),
    prestamoFechaDevolucion: new FormControl('', Validators.required),
    prestamoEstado: new FormControl(false) // Cambiado a booleano para el checkbox
  });

  constructor(
    private loanService: LoanService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    try {
      const storedUser = localStorage.getItem('user');
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
    if (this.loanForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitError = null;

    // Habilitar temporalmente el campo usuario para obtener su valor
    this.loanForm.get('usuario')?.enable();
    
    // Preparar los datos para enviar
    const formData = {
      libros_ID: this.loanForm.value.libro,
      usuarios_ID: this.loanForm.value.usuario,
      prestamosFechaInicial: this.loanForm.value.prestamoFechaInicial,
      prestamosFechaDevolucion: this.loanForm.value.prestamoFechaDevolucion,
      prestamosEstado: this.loanForm.value.prestamoEstado ? 'DEVUELTO' : 'PENDIENTE'
    };

    // Llamar al servicio para guardar
    this.loanService.addLoan(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.loanForm.get('usuario')?.disable();
        
        // Opción 1: Emitir evento (si el padre maneja la navegación)
        this.submitLoan.emit(response);
        
        // Opción 2: Navegar directamente (descomentar si prefieres esta opción)
        // this.router.navigate(['/loans']);
        
        this.resetForm();
      },
      error: (error) => {
        console.error('Error al guardar préstamo:', error);
        this.isSubmitting = false;
        this.loanForm.get('usuario')?.disable();
        this.submitError = 'Error al guardar el préstamo. Por favor intenta nuevamente.';
      }
    });
  }

  resetForm() {
    this.loanForm.reset({
      prestamoEstado: false // Resetear el checkbox a false (PENDIENTE)
    });
    this.loadUser();
    this.loanForm.get('usuario')?.disable();
  }

  get libro() { return this.loanForm.get('libro'); }
}