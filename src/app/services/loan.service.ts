import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://192.168.1.96:3000'; //ip del servidor, cambiar si es necesario
  constructor( private http: HttpClient) { }

  getLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/prestamos`);
  }

  addLoan(loan: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prestamos`, loan);
  }

  updateLoan(id: number, loan: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/prestamos/${id}`, loan);
  }

  deleteLoan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/prestamos/${id}`);
  }
}