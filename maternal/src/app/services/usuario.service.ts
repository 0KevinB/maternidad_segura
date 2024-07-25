import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient, private notificationService: NotificationService) {
    this.myAppUrl = 'http://localhost:3001';
    this.myApiUrl = '/usuarios/';
  }

  singup(user: User): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}registro`, user);
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

  getUserDetails(userId: string | null): Observable<User> {
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}obtener-datos/${userId}`);
  }

  updateUserDetails(userId: string | null, data: User): Observable<User> {
    return this.http.put<User>(`${this.myAppUrl}${this.myApiUrl}update/${userId}`, data);
  }

  // Nuevos métodos para las rutas adicionales

  crearDatosMedicos(data: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}datos-medicos`, data);
  }

  crearAntecedentesObstetricos(data: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}datos-obstetricos`, data);
  }

  crearEmbarazoActual(data: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}datos-embarazo`, data);
  }

  crearHabitos(data: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}datos-habitos`, data);
  }

  crearNutricion(data: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}datos-nutricion`, data);
  }

  crearActividadFisica(data: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}datos-actividad`, data);
  }

  obtenerRecomendaciones(): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}recomendaciones`, {});
  }
}