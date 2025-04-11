import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { Router } from '@angular/router';
import { BooksDataService } from '../../services/books-data.service';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from "../../components/header/header.component";
import { tap } from 'rxjs';

@Component({
  selector: 'app-loans-form',
  providers: [BooksDataService, LoanService, UserService],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, HeaderComponent],
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.css']
})
export class LoansFormComponent{

  loanForm = new FormGroup({
    usuario: new FormControl({ value: '', disabled: true }, Validators.required),
    prestamosFechaInicial: new FormControl('', Validators.required), 
    prestamosFechaFinal: new FormControl('', Validators.required),
  });

  books: any[] = []; // Variable para almacenar los libros obtenidos de la API
  users: any[] = []; // Variable para almacenar los usuarios obtenidos de la API

  libros_ID: number = 0;
  usuarios_ID: number = 0;
  prestamosEstado: boolean = false;

  constructor(private router: Router, private loansService: LoanService, private booksService: BooksDataService) {}

  onSubmit() {

    const prestamo = {
      libros_ID: this.libros_ID,
      usuarios_ID: localStorage.getItem('userID'),
      prestamosFechaInicial: this.loanForm.value.prestamosFechaInicial,
      prestamosFechaDevolucion: this.loanForm.value.prestamosFechaFinal,
      prestamosEstado: this.prestamosEstado
    };

    console.log('prestamo', prestamo); // Debugging: Ver el objeto prestamo en la consola
    this.loansService.addLoan(prestamo).pipe(
      tap((response) => {
        if (response.msg === 'ok') {
          alert('Usuario registrado correctamente');
        } else {
          console.error('Error al regisstrar el usuario:', response);
          alert('Error al registrar el usuario');
        }
      })
    ).subscribe();
  }

  resetForm() {
    this.router.navigate(['prestamos']);
  }

  ngOnInit() {
    console.log(localStorage.getItem('userID'));
    this.loadUser();
    this.loadBooks();
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
  
  private loadBooks() {
    this.booksService.getBooks().subscribe((data: any) => {
      this.books = data;// Asignación de los libros obtenidos a la variable books
    },
    (error: any) => {
      console.error('Error al obtener los libros:', error);// Manejo de errores en la llamada a la API
    });
  }

  onBookChange(event: Event) {
    const selectedBookId = (event.target as HTMLSelectElement).value;
    this.libros_ID = Number(selectedBookId); // Store the selected book's ID 
  }
}