import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculadora1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './calculadora1.component.html',
  styleUrl: './calculadora1.component.css'
})
export class Calculadora1Component {

  public myForm: FormGroup = this.fb.group({
    altura: [''],
    peso: [''],
    hipertension: [''],
    hipotiroidismo: [''],
    hipertiroidismo: [''],
    asma: [''],
    cancer: [''],
    ets: [''],
    ansiedad: [''],
    depresion: [''],
    diabetes: [''],
    enfermedadRenal: [''],
    enfermedadCardiaca: [''],
    medicacion: [''],
    embarazosPrevios: [''],
    preeclampsia: [''],
    partoPrematuro: [''],
    hemorragias: [''],
    perdidaPrimerTrimestre: [''],
    bajoLiquidoAmniotico: [''],
    excesoLiquidoAmniotico: [''],
    anomaliaFetal: [''],
    crecimientoFetalDisminuido: [''],
    fecundacionInVitro: [''],
    gestacionMultiple: [''],
    infeccionEmbarazo: ['']
  });

  constructor(
    private _userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  isValidField(field: string) {
    const control = this.myForm.controls[field];
    return control ? control.valid && control.touched : false;
  }

  onSubmit() {
    // Aquí manejas la lógica para enviar los datos, por ejemplo, a través de un servicio
    console.log(this.myForm.value);
  }
}
