import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../services/loan.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BooksDataService } from '../../services/books-data.service';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-loans',
  providers: [LoanService, BooksDataService, UserService],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, HeaderComponent],
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  loans: any[] = [];
  filteredLoans: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';
  books: any[] = [];
  users: any[] = [];

  constructor(
    private loanService: LoanService,
    private booksService: BooksDataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    
    // Cargar préstamos, libros y usuarios en paralelo
    this.loanService.getLoans().subscribe({
      next: (loans) => {
        this.loans = loans;
        this.filteredLoans = [...loans];
        
        // Cargar datos adicionales
        this.booksService.getBooks().subscribe(books => {
          this.books = books;
          this.userService.getUsers().subscribe(users => {
            this.users = users;
            this.isLoading = false;
          });
        });
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los préstamos';
        console.error('Error loading loans:', err);
        this.isLoading = false;
      }
    });
  }

  getBookTitle(bookId: number): string {
    const book = this.books.find(b => b.librosId === bookId);
    return book ? book.librosTitulo : 'Libro no encontrado';
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.usuariosId === userId);
    return user ? user.usuariosNombre : 'Usuario no encontrado';
  }

  filterLoans(): void {
    if (!this.searchTerm) {
      this.filteredLoans = [...this.loans];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredLoans = this.loans.filter(loan => {
      const bookTitle = this.getBookTitle(loan.prestamoLibroId).toLowerCase();
      const userName = this.getUserName(loan.prestamoUsuarioId).toLowerCase();
      const estado = this.getEstadoText(loan.prestamoEstado).toLowerCase();
      return (
        bookTitle.includes(term) || 
        userName.includes(term) ||
        estado.includes(term)
      );
    });
  }

  getEstadoText(estado: boolean): string {
    return estado ? 'DEVUELTO' : 'PENDIENTE';
  }

  deleteLoan(id: number): void {
    if (confirm('¿Estás seguro de eliminar este préstamo?')) {
      this.loanService.deleteLoan(id).subscribe({
        next: () => {
          this.loadData(); // Recargar los datos después de eliminar
        },
        error: (err) => {
          console.error('Error deleting loan:', err);
          alert('Error al eliminar el préstamo');
        }
      });
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'No definida';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  }
}