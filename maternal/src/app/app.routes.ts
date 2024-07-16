import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormularioDatosComponent } from './pages/formulario-datos/formulario-datos.component';
import { FormularioHabitosComponent } from './pages/formulario-habitos/formulario-habitos.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ContactoProfesionalComponent } from './pages/contacto-profesional/contacto-profesional.component';
import { LoginComponent } from './pages/login/login.component';
import { Calculadora1Component } from './pages/calculadora1/calculadora1.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';


export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'contacto-profesional', component: ContactoProfesionalComponent },
  { path: 'registro', component: FormularioDatosComponent },
  { path: 'calculadora/1', component: Calculadora1Component },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'comunidad', component: ComunidadComponent },
];
