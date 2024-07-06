import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto-profesional',
  standalone: true,
  templateUrl: './contacto-profesional.component.html',
  styleUrl: './contacto-profesional.component.css',
  imports: []
})
export class ContactoProfesionalComponent {


  constructor(
    userService: UsuarioService,
  ) { }




}
