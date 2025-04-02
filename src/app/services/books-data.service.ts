import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksDataService {
  private apiUrl = "http//192.168.1.96:3000"; 
  constructor(private http: HttpClient ) { }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/libros`);
  }

  getBook(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/libro/${id}`);
  }

  addBook(book: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/libro`, book);
  }

  updateBook(id: number, book: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/libro/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/libro/${id}`);
  }

}