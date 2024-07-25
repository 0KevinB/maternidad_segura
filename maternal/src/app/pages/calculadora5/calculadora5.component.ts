import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { CalculadoraDataService } from '../../services/calculadora-data.service';

@Component({
  selector: 'app-calculadora5',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './calculadora5.component.html',
  styleUrl: './calculadora5.component.css'
})
export class Calculadora5Component {
  public myForm: FormGroup;
  
  constructor(
    private calculadoraDataService: CalculadoraDataService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.myForm = this.fb.group({
      dieta: ['', Validators.required],
      frutas: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
      verduras: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
      carnes: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
      comida_rapida: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
      legumbres: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
      mariscos: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
      lacteos: ['', [Validators.required, Validators.min(0), Validators.max(7)]],
      numero_comidas: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      numero_vasos: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      comidas_fuera_casa: ['', [Validators.required, Validators.min(0), Validators.max(21)]]
    });
  }

  ngOnInit() {
    const existingData = this.calculadoraDataService.getData('5');
    this.myForm.patchValue(existingData);

    this.myForm.valueChanges.subscribe(formData => {
      this.calculadoraDataService.updateData('calculadora5', formData);
    });
  }
}