import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { BooksDataService } from '../../services/books-data.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-books-page',
  imports: [HeaderComponent, CommonModule, RouterModule, HttpClientModule],
  standalone: true,
  providers: [BooksDataService],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css'
})
export class BooksPageComponent {
  books: any[] = []; // Variable para almacenar los libros obtenidos de la API

  constructor( private booksDataService: BooksDataService, private router: Router ) {}

  ngOnInit(): void { // Método que se ejecuta al inicializar el componente
    // Llamada al servicio books-data.service para obtener los libros de la API
    this.booksDataService.getBooks().subscribe((data: any) => {
      this.books = data;// Asignación de los libros obtenidos a la variable books
    },
    (error: any) => {
      console.error('Error al obtener los libros:', error);// Manejo de errores en la llamada a la API
    });
  }
}
