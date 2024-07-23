import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserFromToken());
    this.currentUser = this.currentUserSubject.asObservable();
    this.myAppUrl = 'http://localhost:3001';
    this.myApiUrl = '/usuarios/'
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(correo: any, contraseña: any) {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}login`, {correo, contraseña})
      .pipe(map(response => {
        if (response) {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(this.getUserFromToken());
        }
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private getUserFromToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}