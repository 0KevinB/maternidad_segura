import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculadoraDataService } from '../../services/calculadora-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calculadora1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculadora1.component.html',
  styleUrls: ['./calculadora1.component.css']
})
export class Calculadora1Component implements OnInit, OnDestroy {
  myForm: FormGroup;
  private subscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private calculadoraDataService: CalculadoraDataService
  ) {
    this.myForm = this.fb.group({
      altura: [''],
      peso: [''],
      hipertension: [false],
      hipotiroidismo: [false],
      hipertiroidismo: [false],
      asma: [false],
      cancer: [false],
      ETS: [false],
      ansiedad: [false],
      depresion: [false],
      diabetes: [false],
      enfermedad_renal: [false],
      enfermedad_cardiaca: [false],
      medicacion: [false],
    });
  }

  ngOnInit() {
    // Obtén los datos iniciales
    const existingData = this.calculadoraDataService.getData('calculadora1');
    
    // Actualiza el formulario sin disparar el valueChanges
    this.myForm.patchValue(existingData, { emitEvent: false });
  
    // Suscríbete a los cambios del formulario
    this.myForm.valueChanges.subscribe(formData => {
      // Actualiza el servicio solo si los datos han cambiado realmente
      if (JSON.stringify(formData) !== JSON.stringify(existingData)) {
        this.calculadoraDataService.updateData('calculadora1', formData);
      }
    });
  
    // Suscríbete a los cambios del servicio
    this.subscription = this.calculadoraDataService.calculadora1$.subscribe(
      (data) => {
        if (data && JSON.stringify(data) !== JSON.stringify(this.myForm.value)) {
          this.myForm.patchValue(data, { emitEvent: false });
        }
      }
    );
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}