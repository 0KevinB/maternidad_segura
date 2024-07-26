import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ContactoProfesionalComponent } from './pages/contacto-profesional/contacto-profesional.component';
import { LoginComponent } from './pages/login/login.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
import { RegistroComponent } from './pages/registro/registro.component';

import { CalculadoraComponent } from './pages/calculadora/calculadora.component';


export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'contacto-profesional', component: ContactoProfesionalComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'calculadora', component: CalculadoraComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'comunidad', component: ComunidadComponent },
];
