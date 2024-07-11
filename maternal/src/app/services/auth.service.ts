// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private authToken: string | null = null;
  constructor(private router: Router) { }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    const data = localStorage.getItem('token');
    if (data) {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  // Método para realizar el login y almacenar el token
  login(token: string): void {
    // Almacena el token en el localStorage o en una cookie
    localStorage.setItem('authToken', token);

    // Actualiza el estado de autenticación a verdadero
    this.isAuthenticated = true;
  }

  logout(): void {
    // Limpiar el token del localStorage u otra forma de almacenamiento
    localStorage.removeItem('token');

    // Actualizar el estado de autenticación a falso
    this.isAuthenticated = false;

    // Redirigir al usuario a la página de inicio de sesión u otra página después del logout
    this.router.navigate(['/inicio']);
  }


}
