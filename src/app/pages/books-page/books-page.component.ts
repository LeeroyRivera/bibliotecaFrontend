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
  books: any[] = [];

  constructor( private booksDataService: BooksDataService, private router: Router ) {}

  ngOnInit(): void {
    this.booksDataService.getBooks().subscribe((data: any) => {
      this.books = data;
    },
    (error: any) => {
      console.error('Error al obtener los libros:', error);
    });
  }
}
