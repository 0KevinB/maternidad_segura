import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MedicoServiceService } from '../../services/medico-service.service';
import { Medico } from '../../interfaces/medico';

@Component({
  selector: 'app-contacto-profesional',
  standalone: true,
  templateUrl: './contacto-profesional.component.html',
  styleUrl: './contacto-profesional.component.css',
  imports: [HeaderComponent, FooterComponent, CommonModule]
})
export class ContactoProfesionalComponent implements OnInit{

  dato_medico: Medico[] = [] || null; 

  constructor(
    private medicoService: MedicoServiceService,
  ) { }

  ngOnInit(): void {
    this.getMedico()
  }

  getMedico() {
    this.medicoService.getMedicoDetails().subscribe((data)=>{
      console.log(data  )
      this.dato_medico=data})
  }


}
