import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { CalculadoraDataService } from '../../services/calculadora-data.service';

@Component({
  selector: 'app-calculadora6',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './calculadora6.component.html',
  styleUrl: './calculadora6.component.css'
})
export class Calculadora6Component {
  public myForm: FormGroup;
  
  constructor(
    private calculadoraDataService: CalculadoraDataService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.myForm = this.fb.group({
      actividad_fisica: ['', Validators.required],
      frecuencia_actividad: [''],
      tiempo_actividad: ['']
    });

    // Configurar validadores condicionales
    this.myForm.get('actividad_fisica')?.valueChanges.subscribe(value => {
      if (value === 'si') {
        this.myForm.get('frecuencia_actividad')?.setValidators([Validators.required]);
        this.myForm.get('tiempo_actividad')?.setValidators([Validators.required, Validators.min(1), Validators.max(300)]);
      } else {
        this.myForm.get('frecuencia_actividad')?.clearValidators();
        this.myForm.get('tiempo_actividad')?.clearValidators();
      }
      this.myForm.get('frecuencia_actividad')?.updateValueAndValidity();
      this.myForm.get('tiempo_actividad')?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    const existingData = this.calculadoraDataService.getData('calculadora6');
    this.myForm.patchValue(existingData);

    this.myForm.valueChanges.subscribe(formData => {
      this.calculadoraDataService.updateData('calculadora6', formData);
    });
  }
}