import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-formulario-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FooterComponent,],
  templateUrl: './formulario-datos.component.html',
  styleUrl: './formulario-datos.component.css'
})
export class FormularioDatosComponent {


  public myForm: FormGroup = this.fb.group({
    nombre: [''],
    apellidos: [''],
    correo: [''],
    fecha_nacimiento: [''],
    telefono: [''],
    contraseña: [''],
    passwordConfirm: [''],
    terminos: [''],
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
    const user: User = {
      nombre: this.myForm.value.nombre,
      apellido: this.myForm.value.apellidos,
      correo: this.myForm.value.correo,
      contraseña: this.myForm.value.contraseña,
      telefono: this.myForm.value.telefono,
      fecha_nacimiento: this.myForm.value.fecha_nacimiento
    }
    console.log(user);
    if (this.myForm.value.Contraseña != this.myForm.value.passwordConfirm ||
      this.myForm.value.CorreoElectronico != this.myForm.value.emailConfirm
    ) {
      return
    }
    this._userService.singup(user).subscribe(data => {
      this.notificationService.notify('Registrado correctamente.', 2000);
      this.router.navigate(['/login'])
    })
  }
}