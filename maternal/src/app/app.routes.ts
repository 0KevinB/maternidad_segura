import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormularioDatosComponent } from './pages/formulario-datos/formulario-datos.component';
import { FormularioHabitosComponent } from './pages/formulario-habitos/formulario-habitos.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ContactoProfesionalComponent } from './pages/contacto-profesional/contacto-profesional.component';


export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'contacto-profesional', component: ContactoProfesionalComponent },
  { path: 'calculadora/1', component: FormularioDatosComponent },
  { path: 'calculadora/2', component: FormularioHabitosComponent },
  { path: 'resultados', component: ResultadosComponent },
];
