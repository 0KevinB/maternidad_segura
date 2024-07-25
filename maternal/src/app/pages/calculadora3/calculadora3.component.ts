import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

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
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  isValidField(field: string) {
    const control = this.myForm.get(field);
    return control ? control.valid && control.touched : false;
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      // Aquí puedes agregar la lógica para enviar los datos al servicio
      // this.userService.updatePregnancyInfo(this.myForm.value).subscribe(
      //   response => {
      //     this.notificationService.showSuccess('Información del embarazo actualizada con éxito');
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error => {
      //     this.notificationService.showError('Error al actualizar la información del embarazo');
      //   }
      // );
    } else {
      this.myForm.markAllAsTouched();
      this.notificationService.notify('Por favor, completa todos los campos requeridos correctamente.');
    }
  }
}