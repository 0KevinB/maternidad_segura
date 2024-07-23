import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { NotificationService } from '../../services/notification.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FormularioDatosComponent } from '../formulario-datos/formulario-datos.component';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterLink, LoginComponent,HeaderComponent
    , FormularioDatosComponent, CommonModule,
    ReactiveFormsModule,FooterComponent
  ]
})

export class LoginComponent implements OnInit {
  correo: string = ''
  contraseña: string = ''
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private _userService: UserService,
    private _authService: AuthService ,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  login() {
    {
      if (this.loginForm.invalid) {
        return;
      }

      this.correo = this.loginForm.value.email;
      this.contraseña = this.loginForm.value.password;
      // Campos vacíos
      if (this.correo === '' || this.contraseña === '') {
        this.notificationService.notify('Por favor, completa todos los campos.');
        return;
      }

      // Body
      const user: User = {
        correo: this.correo,
        contraseña: this.contraseña
      }

      this.loading = true;
      this._authService.login(user.correo, user.contraseña).subscribe({
        next: (data: any) => {
          this.router.navigate(['/inicio'])
          localStorage.setItem('token', data.token)
        }, error: (error) => {
          this.notificationService.notify('Credenciales incorrectas. Por favor, intenta de nuevo.', 2000);
        },
      })
    }

  }

}
