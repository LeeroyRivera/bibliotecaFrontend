import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksDataService } from '../../services/books-data.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private booksService: BooksDataService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.booksService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.filteredBooks = [...data];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los libros';
        console.error('Error loading books:', err);
        this.isLoading = false;
      }
    });
  }

  filterBooks(): void {
    if (!this.searchTerm) {
      this.filteredBooks = [...this.books];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredBooks = this.books.filter(book => 
      book.librosTitulo.toLowerCase().includes(term) || 
      book.librosAutor.toLowerCase().includes(term) ||
      book.librosGenero.toLowerCase().includes(term)
    );
  }

  deleteBook(id: number): void {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.booksService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks(); // Recargar la lista después de eliminar
        },
        error: (err) => {
          console.error('Error deleting book:', err);
          alert('Error al eliminar el libro');
        }
      });
    }
  }
}