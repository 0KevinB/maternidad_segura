import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Medico } from '../interfaces/medico';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoServiceService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient, private notificationService: NotificationService
  ) {
    this.myAppUrl = 'http://localhost:3001';
    this.myApiUrl = '/medicos/'
  }

  getMedicoDetails(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.myAppUrl}${this.myApiUrl}/contacto-medico`);
  }
}
