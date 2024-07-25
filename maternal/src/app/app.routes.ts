import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormularioDatosComponent } from './pages/formulario-datos/formulario-datos.component';
import { FormularioHabitosComponent } from './pages/formulario-habitos/formulario-habitos.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ContactoProfesionalComponent } from './pages/contacto-profesional/contacto-profesional.component';
import { LoginComponent } from './pages/login/login.component';
import { Calculadora1Component } from './pages/calculadora1/calculadora1.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { Calculadora2Component } from './pages/calculadora2/calculadora2.component';
import { Calculadora3Component } from './pages/calculadora3/calculadora3.component';
import { Calculadora4Component } from './pages/calculadora4/calculadora4.component';
import { Calculadora5Component } from './pages/calculadora5/calculadora5.component';
import { Calculadora6Component } from './pages/calculadora6/calculadora6.component';


export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'contacto-profesional', component: ContactoProfesionalComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'calculadora/1', component: Calculadora1Component },
  { path: 'calculadora/2', component: Calculadora2Component },
  { path: 'calculadora/3', component: Calculadora3Component },
  { path: 'calculadora/4', component: Calculadora4Component },
  { path: 'calculadora/5', component: Calculadora5Component },
  { path: 'calculadora/6', component: Calculadora6Component },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'comunidad', component: ComunidadComponent },
];
