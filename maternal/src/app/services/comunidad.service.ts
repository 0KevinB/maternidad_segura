import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ComunidadService {
  private apiUrl = 'http://localhost:3001/comunidad';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }

  getPublicaciones(categoriaId?: number): Observable<any[]> {
    const url = categoriaId ? `${this.apiUrl}/publicaciones?categoria_id=${categoriaId}` : `${this.apiUrl}/publicaciones`;
    return this.http.get<any[]>(url);
  }

  getComentarios(publicacionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/publicaciones/${publicacionId}/comentarios`);
  }

  crearPublicacion(publicacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/publicaciones`, publicacion);
  }

  crearComentario(comentario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/comentarios`, comentario);
  }
}