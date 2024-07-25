import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculadora4',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './calculadora4.component.html',
  styleUrl: './calculadora4.component.css'
})
export class Calculadora4Component {
  public myForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.myForm = this.fb.group({
      bebidas_alcoholicas: [false],
      tipo_alcohol: [''],
      frecuencia_alcohol: [''],
      drogas: [false],
      tipo_droga: [''],
      frecuencia_droga: [''],
      tabaco: [false],
      frecuencia_tabaco: [''],
      hogar_libre_tabaco: [false]
    });

    // Configurar validadores condicionales
    this.myForm.get('bebidas_alcoholicas')?.valueChanges.subscribe(value => {
      if (value) {
        this.myForm.get('tipo_alcohol')?.setValidators([Validators.required]);
        this.myForm.get('frecuencia_alcohol')?.setValidators([Validators.required]);
      } else {
        this.myForm.get('tipo_alcohol')?.clearValidators();
        this.myForm.get('frecuencia_alcohol')?.clearValidators();
      }
      this.myForm.get('tipo_alcohol')?.updateValueAndValidity();
      this.myForm.get('frecuencia_alcohol')?.updateValueAndValidity();
    });

    this.myForm.get('drogas')?.valueChanges.subscribe(value => {
      if (value) {
        this.myForm.get('tipo_droga')?.setValidators([Validators.required]);
        this.myForm.get('frecuencia_droga')?.setValidators([Validators.required]);
      } else {
        this.myForm.get('tipo_droga')?.clearValidators();
        this.myForm.get('frecuencia_droga')?.clearValidators();
      }
      this.myForm.get('tipo_droga')?.updateValueAndValidity();
      this.myForm.get('frecuencia_droga')?.updateValueAndValidity();
    });

    this.myForm.get('tabaco')?.valueChanges.subscribe(value => {
      if (value) {
        this.myForm.get('frecuencia_tabaco')?.setValidators([Validators.required]);
      } else {
        this.myForm.get('frecuencia_tabaco')?.clearValidators();
      }
      this.myForm.get('frecuencia_tabaco')?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      // Aquí puedes agregar la lógica para enviar los datos al servicio
      // this.userService.updateHabitsInfo(this.myForm.value).subscribe(
      //   response => {
      //     this.notificationService.showSuccess('Información de hábitos actualizada con éxito');
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error => {
      //     this.notificationService.showError('Error al actualizar la información de hábitos');
      //   }
      // );
    } else {
      this.myForm.markAllAsTouched();
      this.notificationService.notify('Por favor, completa todos los campos requeridos correctamente.');
    }
  }
}