import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

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
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  isValidField(field: string) {
    const control = this.myForm.controls[field];
    return control ? control.valid && control.touched : false;
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      // Aquí puedes agregar la lógica para enviar los datos al servicio
      // this.userService.updateObstetricHistory(this.myForm.value).subscribe(
      //   response => {
      //     this.notificationService.showSuccess('Historial obstétrico actualizado con éxito');
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error => {
      //     this.notificationService.showError('Error al actualizar el historial obstétrico');
      //   }
      // );
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}