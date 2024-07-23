import { Router } from 'express';
import {
    crearCategoria,
    obtenerCategorias,
    crearPublicacion,
    obtenerPublicaciones,
    obtenerPublicacionPorId,
    crearComentario,
    obtenerComentarios
} from '../controlers/comunityControler';

const router = Router();

// Rutas para categorías
router.post('/categorias', crearCategoria);
router.get('/categorias', obtenerCategorias);

// Rutas para publicaciones
router.post('/publicaciones', crearPublicacion);
router.get('/publicaciones', obtenerPublicaciones);
router.get('/publicaciones/:id', obtenerPublicacionPorId);

// Rutas para comentarios
router.post('/comentarios', crearComentario);
router.get('/publicaciones/:id/comentarios', obtenerComentarios);

export default router;