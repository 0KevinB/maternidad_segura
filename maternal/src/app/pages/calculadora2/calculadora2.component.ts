import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { CalculadoraDataService } from '../../services/calculadora-data.service';

@Component({
  selector: 'app-calculadora2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './calculadora2.component.html',
  styleUrl: './calculadora2.component.css'
})
export class Calculadora2Component {
  public myForm: FormGroup = this.fb.group({
    embarazos_previos: [''],
    preeclampsia: [false],
    parto_prematuro: [false],
    hemorragias: [false],
    perdida: [false],
  });
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private calculadoraDataService: CalculadoraDataService
  ) { }

  isValidField(field: string) {
    const control = this.myForm.controls[field];
    return control ? control.valid && control.touched : false;
  }

  ngOnInit() {
    const existingData = this.calculadoraDataService.getData('calculadora2');
    this.myForm.patchValue(existingData);

    this.myForm.valueChanges.subscribe(formData => {
      this.calculadoraDataService.updateData('calculadora2', formData);
    });
  }
}