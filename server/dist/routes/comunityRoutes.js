"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comunityControler_1 = require("../controlers/comunityControler");
const router = (0, express_1.Router)();
// Rutas para categorías
router.post('/categorias', comunityControler_1.crearCategoria);
router.get('/categorias', comunityControler_1.obtenerCategorias);
// Rutas para publicaciones
router.post('/publicaciones', comunityControler_1.crearPublicacion);
router.get('/publicaciones', comunityControler_1.obtenerPublicaciones);
router.get('/publicaciones/:id', comunityControler_1.obtenerPublicacionPorId);
// Rutas para comentarios
router.post('/comentarios', comunityControler_1.crearComentario);
router.get('/publicaciones/:id/comentarios', comunityControler_1.obtenerComentarios);
exports.default = router;
