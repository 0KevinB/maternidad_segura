import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComunidadService } from './../../services/comunidad.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comunidad',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './comunidad.component.html',
  styleUrl: './comunidad.component.css'
})

export class ComunidadComponent implements OnInit {
  categorias: any[] = [];
  publicaciones: any[] = [];
  comentarios: any[] = [];
  categoriaSeleccionada: number | null = null;
  publicacionSeleccionada: any | null = null;
  nuevaPublicacion: any = {};
  nuevoComentario: string = '';

  constructor(private comunidadService: ComunidadService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.comunidadService.getCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => console.error('Error al cargar categorías:', error)
    );
  }

  cargarPublicaciones(categoriaId: number) {
    this.categoriaSeleccionada = categoriaId;
    this.comunidadService.getPublicaciones(categoriaId).subscribe(
      (data) => {
        this.publicaciones = data;
        console.log(data)
        this.comentarios = [];
        this.publicacionSeleccionada = null;
      },
      (error) => console.error('Error al cargar publicaciones:', error)
    );
  }

  cargarComentarios(publicacionId: number) {
    this.publicacionSeleccionada = this.publicaciones.find(p => p.id === publicacionId);
    this.comunidadService.getComentarios(publicacionId).subscribe(
      (data) => {
        this.comentarios = data;
        console.log(data)
      },
      (error) => console.error('Error al cargar comentarios:', error)
    );
  }

  crearPublicacion() {
    if (!this.nuevaPublicacion.titulo || !this.nuevaPublicacion.contenido) {
      alert('Por favor, completa todos los campos');
      return;
    }
    this.nuevaPublicacion.categoria_id = this.categoriaSeleccionada;
    this.nuevaPublicacion.usuario_id = 1; // Asume que tienes un usuario logueado, ajusta según tu lógica de autenticación

    this.comunidadService.crearPublicacion(this.nuevaPublicacion).subscribe(
      (response) => {
        console.log('Publicación creada', response);
        this.cargarPublicaciones(this.categoriaSeleccionada!);
        this.nuevaPublicacion = {};
      },
      (error) => console.error('Error al crear publicación:', error)
    );
  }

  crearComentario() {
    if (!this.nuevoComentario) {
      alert('Por favor, escribe un comentario');
      return;
    }
    const comentario = {
      usuario_id: 1, // Asume que tienes un usuario logueado, ajusta según tu lógica de autenticación
      publicacion_id: this.publicacionSeleccionada.id,
      contenido: this.nuevoComentario
    };

    this.comunidadService.crearComentario(comentario).subscribe(
      (response) => {
        console.log('Comentario creado', response);
        this.cargarComentarios(this.publicacionSeleccionada.id);
        this.nuevoComentario = '';
      },
      (error) => console.error('Error al crear comentario:', error)
    );
  }

  volverACategorias() {
    this.categoriaSeleccionada = null;
    this.publicaciones = [];
    this.publicacionSeleccionada = null;
    this.comentarios = [];
  }

  volverAPublicaciones() {
    this.publicacionSeleccionada = null;
    this.comentarios = [];
  }
}