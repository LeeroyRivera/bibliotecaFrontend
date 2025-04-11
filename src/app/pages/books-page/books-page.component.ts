import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { BooksDataService } from '../../services/books-data.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books-page',
  imports: [HeaderComponent, CommonModule, RouterModule, HttpClientModule, FormsModule],
  standalone: true,
  providers: [BooksDataService],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css'
})
export class BooksPageComponent implements OnInit {
  books: any[] = []; // Variable para almacenar los libros obtenidos de la API
  filteredBooks: any[] = []; // Variable para almacenar los libros filtrados
  searchTerm: string = ''; // Variable para almacenar el término de búsqueda

  constructor( private booksDataService: BooksDataService, private router: Router ) {}

  ngOnInit(): void { // Método que se ejecuta al inicializar el componente
    // Llamada al servicio books-data.service para obtener los libros de la API
    this.booksDataService.getBooks().subscribe((data: any) => {
      this.books = data;// Asignación de los libros obtenidos a la variable books
      this.filteredBooks = [...this.books];// Inicialización de la variable filteredBooks con todos los libros
    },
    (error: any) => {
      console.error('Error al obtener los libros:', error);// Manejo de errores en la llamada a la API
    });
  }

  filterBooks(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.librosTitulo.toLowerCase().includes(term) || 
      book.librosGenero.toLowerCase().includes(term)
    );
  }

}
