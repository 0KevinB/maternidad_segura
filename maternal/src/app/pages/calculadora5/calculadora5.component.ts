import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

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
    private userService: UserService,
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

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      // Aquí puedes agregar la lógica para enviar los datos al servicio
      // this.userService.updateDietInfo(this.myForm.value).subscribe(
      //   response => {
      //     this.notificationService.showSuccess('Información de dieta actualizada con éxito');
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error => {
      //     this.notificationService.showError('Error al actualizar la información de dieta');
      //   }
      // );
    } else {
      this.myForm.markAllAsTouched();
      this.notificationService.notify('Por favor, completa todos los campos requeridos correctamente.');
    }
  }
}