import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculadoraDataService } from '../../services/calculadora-data.service';

@Component({
  selector: 'app-calculadora1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculadora1.component.html',
  styleUrls: ['./calculadora1.component.css']
})
export class Calculadora1Component implements OnInit {
  myForm: FormGroup;

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
    const existingData = this.calculadoraDataService.getData('calculadora1');
    this.myForm.patchValue(existingData);

    this.myForm.valueChanges.subscribe(formData => {
      this.calculadoraDataService.updateData('calculadora1', formData);
    });
  }

  // Otros métodos...
}