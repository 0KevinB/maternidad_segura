import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient, private notificationService: NotificationService
  ) {
    this.myAppUrl = 'http://localhost:3001';
    this.myApiUrl = '/usuarios/'
  }
  singup(user: User): Observable<String> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}registro`, user)
  }
  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}login`, user).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.notificationService.notify('Credenciales incorrectas. Por favor, intenta de nuevo.');
        } else {
          this.notificationService.notify('Error al intentar iniciar sesión. Por favor, inténtalo más tarde.');
        }
        return throwError(error);
      })
    );
  }
  sendResetEmail(email: string): Observable<any> {
    const data = { CorreoElectronico: email };
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}forgotPassword`, data);
  }
  resetPassword(token: string, newPassword: string): Observable<String> {
    const body = { token, newPassword };
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}resetPassword`, body);
  }
  getCedulaUsuario(): Observable<string | null> {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      return of(decodedToken ? decodedToken.Cedula : null);
    }
    return of(null);
  }
  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }
  getUserDetails(userId: string | null): Observable<User> {
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}/getUserDetails/${userId}`);
  }
  updateUserDetails(userId: string | null, data: User): Observable<User> {
    return this.http.put<User>(`${this.myAppUrl}${this.myApiUrl}/update/${userId}`, data);
  }
}