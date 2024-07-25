import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { CalculadoraDataService } from '../../services/calculadora-data.service';

@Component({
  selector: 'app-calculadora3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './calculadora3.component.html',
  styleUrl: './calculadora3.component.css'
})
export class Calculadora3Component {
  public myForm: FormGroup = this.fb.group({
    enfermedad_actual: [false],
    bajo_liquido_amniotico: [false],
    alto_liquido_amniotico: [false],
    anomalia_fetal: [false],
    crecimiento_disminuido: [false],
    in_vitro: [false],
    gestacion_multiple: [false],
    semanas_embarazo: ['', [Validators.required, Validators.min(1), Validators.max(42)]],
    numero_fetos: ['', [Validators.required, Validators.min(1)]],
  });
  
  constructor(
    private calculadoraDataService: CalculadoraDataService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  isValidField(field: string) {
    const control = this.myForm.get(field);
    return control ? control.valid && control.touched : false;
  }

  ngOnInit() {
    const existingData = this.calculadoraDataService.getData('calculadora3');
    this.myForm.patchValue(existingData);

    this.myForm.valueChanges.subscribe(formData => {
      this.calculadoraDataService.updateData('calculadora3', formData);
    });
  }
}