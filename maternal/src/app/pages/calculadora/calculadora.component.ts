import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Calculadora1Component } from '../calculadora1/calculadora1.component';
import { Calculadora2Component } from "../calculadora2/calculadora2.component";
import { Calculadora3Component } from "../calculadora3/calculadora3.component";
import { Calculadora4Component } from "../calculadora4/calculadora4.component";
import { Calculadora5Component } from "../calculadora5/calculadora5.component";
import { Calculadora6Component } from "../calculadora6/calculadora6.component";
import { CommonModule } from '@angular/common';
import { CalculadoraDataService } from '../../services/calculadora-data.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, Calculadora1Component, CalculadoraComponent, 
    Calculadora2Component, Calculadora3Component, Calculadora4Component, Calculadora5Component, 
    Calculadora6Component, CommonModule],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent implements OnInit{
    currentStep = 1;
    usuario_id = this._authService.getID()
      
      constructor(private usuarioService: UsuarioService, private calculadoraDataService: CalculadoraDataService, private _authService: AuthService) {
    }

    ngOnInit() {
      this.cargarDatosUsuario();
    }
    cargarDatosUsuario() {
      if (this.usuario_id) {
        this.usuarioService.getAllUserData(this.usuario_id).subscribe(
          (datos) => {
            if (datos.datosUsuario.datosMedicos) {
              this.calculadoraDataService.updateData('calculadora1', datos.datosUsuario.datosMedicos);
            }
            if (datos.datosUsuario.antecedentesObstetricos) {
              this.calculadoraDataService.updateData('calculadora2', datos.datosUsuario.antecedentesObstetricos);
            }
            if (datos.datosUsuario.embarazoActual) {
              this.calculadoraDataService.updateData('calculadora3', datos.datosUsuario.embarazoActual);
            }
            if (datos.datosUsuario.habitos) {
              this.calculadoraDataService.updateData('calculadora4', datos.datosUsuario.habitos);
            }
            if (datos.datosUsuario.nutricion) {
              this.calculadoraDataService.updateData('calculadora5', datos.datosUsuario.nutricion);
            }
            if (datos.datosUsuario.actividadFisica) {
              this.calculadoraDataService.updateData('calculadora6', datos.datosUsuario.actividadFisica);
            }
            console.log('Datos cargados:');
          },
          (error) => {
            console.error('Error al cargar los datos del usuario:', error);
          }
        );
      }
    }
  
    nextStep() {
      if (this.currentStep < 6) {
        this.currentStep++;
      }
    }
  
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    }
  
    saveProgress() {
      const allData = this.calculadoraDataService.getAllData();
      // Aquí puedes implementar la lógica para guardar los datos
      localStorage.setItem('calculadoraData', JSON.stringify(allData));
    }
  
    submitAll() {
      const allData = this.calculadoraDataService.getAllData();
      
      // Enviar datos de la calculadora 1 (Datos Médicos)
      this.usuarioService.crearDatosMedicos({ ...allData['calculadora1'], usuario_id: this.usuario_id }).subscribe(
        response => console.log('Datos médicos enviados:', response),
        error => console.error('Error al enviar datos médicos:', error)
      );
  
      // Enviar datos de la calculadora 2 (Antecedentes Obstétricos)
      this.usuarioService.crearAntecedentesObstetricos({ ...allData['calculadora2'], usuario_id: this.usuario_id }).subscribe(
        response => console.log('Antecedentes obstétricos enviados:', response),
        error => console.error('Error al enviar antecedentes obstétricos:', error)
      );
  
      // Enviar datos de la calculadora 3 (Embarazo Actual)
      this.usuarioService.crearEmbarazoActual({ ...allData['calculadora3'], usuario_id: this.usuario_id }).subscribe(
        response => console.log('Datos de embarazo actual enviados:', response),
        error => console.error('Error al enviar datos de embarazo actual:', error)
      );
  
      // Enviar datos de la calculadora 4 (Hábitos)
      this.usuarioService.crearHabitos({ ...allData['calculadora4'], usuario_id: this.usuario_id }).subscribe(
        response => console.log('Datos de hábitos enviados:', response),
        error => console.error('Error al enviar datos de hábitos:', error)
      );
  
      // Enviar datos de la calculadora 5 (Nutrición)
      this.usuarioService.crearNutricion({ ...allData['calculadora5'], usuario_id: this.usuario_id }).subscribe(
        response => console.log('Datos de nutrición enviados:', response),
        error => console.error('Error al enviar datos de nutrición:', error)
      );
  
      // Enviar datos de la calculadora 6 (Actividad Física)
      this.usuarioService.crearActividadFisica({ ...allData['calculadora6'], usuario_id: this.usuario_id }).subscribe(
        response => console.log('Datos de actividad física enviados:', response),
        error => console.error('Error al enviar datos de actividad física:', error)
      );
  
      console.log('Enviando todos los datos:', { ...allData, usuario_id: this.usuario_id });
    }
  
    getCurrentCalculadoraData() {
      return this.calculadoraDataService.getData(`calculadora${this.currentStep}`);
    }

  }