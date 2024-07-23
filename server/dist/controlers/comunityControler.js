"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerComentarios = exports.crearComentario = exports.obtenerPublicacionPorId = exports.obtenerPublicaciones = exports.crearPublicacion = exports.obtenerCategorias = exports.crearCategoria = void 0;
const db_1 = __importDefault(require("../models/db"));
const crearCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
        return res.status(400).json({ message: 'El nombre de la categoría es obligatorio' });
    }
    try {
        const { rows } = yield db_1.default.query('INSERT INTO categoria (nombre, descripcion) VALUES ($1, $2) RETURNING id', [nombre, descripcion]);
        res.status(201).json({ message: 'Categoría creada exitosamente', categoria_id: rows[0].id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la categoría' });
    }
});
exports.crearCategoria = crearCategoria;
const obtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield db_1.default.query('SELECT * FROM categoria ORDER BY nombre');
        res.status(200).json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
});
exports.obtenerCategorias = obtenerCategorias;
const crearPublicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, categoria_id, titulo, contenido } = req.body;
    if (!usuario_id || !categoria_id || !titulo || !contenido) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try {
        const { rows } = yield db_1.default.query('INSERT INTO publicacion (usuario_id, categoria_id, titulo, contenido) VALUES ($1, $2, $3, $4) RETURNING id', [usuario_id, categoria_id, titulo, contenido]);
        res.status(201).json({ message: 'Publicación creada exitosamente', publicacion_id: rows[0].id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la publicación' });
    }
});
exports.crearPublicacion = crearPublicacion;
const obtenerPublicaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoria_id } = req.query;
    try {
        let query = `
            SELECT p.id, p.titulo, p.contenido, p.fecha_creacion, 
                   u.nombre AS autor_nombre, u.apellido AS autor_apellido,
                   c.nombre AS categoria
            FROM publicacion p
            JOIN usuario u ON p.usuario_id = u.id
            JOIN categoria c ON p.categoria_id = c.id
        `;
        const params = [];
        if (categoria_id) {
            query += ' WHERE p.categoria_id = $1';
            params.push(categoria_id);
        }
        query += ' ORDER BY p.fecha_creacion DESC';
        const { rows } = yield db_1.default.query(query, params);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las publicaciones' });
    }
});
exports.obtenerPublicaciones = obtenerPublicaciones;
const obtenerPublicacionPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield db_1.default.query(`SELECT p.id, p.titulo, p.contenido, p.fecha_creacion, u.nombre, u.apellido, c.nombre AS categoria
            FROM publicacion p
            JOIN usuario u ON p.usuario_id = u.id
            JOIN categoria c ON p.categoria_id = c.id
            WHERE p.id = $1`, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la publicación' });
    }
});
exports.obtenerPublicacionPorId = obtenerPublicacionPorId;
const crearComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, publicacion_id, contenido } = req.body;
    if (!usuario_id || !publicacion_id || !contenido) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try {
        yield db_1.default.query('INSERT INTO comentario (usuario_id, publicacion_id, contenido) VALUES ($1, $2, $3)', [usuario_id, publicacion_id, contenido]);
        res.status(201).json({ message: 'Comentario creado exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el comentario' });
    }
});
exports.crearComentario = crearComentario;
const obtenerComentarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield db_1.default.query(`SELECT c.id, c.contenido, c.fecha_creacion, 
                    u.nombre AS autor_nombre, u.apellido AS autor_apellido
             FROM comentario c
             JOIN usuario u ON c.usuario_id = u.id
             WHERE c.publicacion_id = $1
             ORDER BY c.fecha_creacion ASC`, [id]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
});
exports.obtenerComentarios = obtenerComentarios;
