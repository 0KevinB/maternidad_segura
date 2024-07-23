import { Request, Response } from 'express';
import connection from '../models/db';

export const crearCategoria = async (req: Request, res: Response) => {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({ message: 'El nombre de la categoría es obligatorio' });
    }

    try {
        const { rows } = await connection.query(
            'INSERT INTO categoria (nombre, descripcion) VALUES ($1, $2) RETURNING id',
            [nombre, descripcion]
        );

        res.status(201).json({ message: 'Categoría creada exitosamente', categoria_id: rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la categoría' });
    }
};

export const obtenerCategorias = async (req: Request, res: Response) => {
    try {
        const { rows } = await connection.query('SELECT * FROM categoria ORDER BY nombre');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
};

export const crearPublicacion = async (req: Request, res: Response) => {
    const { usuario_id, categoria_id, titulo, contenido } = req.body;

    if (!usuario_id || !categoria_id || !titulo || !contenido) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const { rows } = await connection.query(
            'INSERT INTO publicacion (usuario_id, categoria_id, titulo, contenido) VALUES ($1, $2, $3, $4) RETURNING id',
            [usuario_id, categoria_id, titulo, contenido]
        );

        res.status(201).json({ message: 'Publicación creada exitosamente', publicacion_id: rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la publicación' });
    }
};

export const obtenerPublicaciones = async (req: Request, res: Response) => {
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

        const { rows } = await connection.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las publicaciones' });
    }
};

export const obtenerPublicacionPorId = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { rows } = await connection.query(
            `SELECT p.id, p.titulo, p.contenido, p.fecha_creacion, u.nombre AS autor, c.nombre AS categoria
            FROM publicacion p
            JOIN usuario u ON p.usuario_id = u.id
            JOIN categoria c ON p.categoria_id = c.id
            WHERE p.id = $1`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la publicación' });
    }
};

export const crearComentario = async (req: Request, res: Response) => {
    const { usuario_id, publicacion_id, contenido } = req.body;

    if (!usuario_id || !publicacion_id || !contenido) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        await connection.query(
            'INSERT INTO comentario (usuario_id, publicacion_id, contenido) VALUES ($1, $2, $3)',
            [usuario_id, publicacion_id, contenido]
        );

        res.status(201).json({ message: 'Comentario creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el comentario' });
    }
};

export const obtenerComentarios = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { rows } = await connection.query(
            `SELECT c.id, c.contenido, c.fecha_creacion, 
                    u.nombre AS autor_nombre, u.apellido AS autor_apellido
             FROM comentario c
             JOIN usuario u ON c.usuario_id = u.id
             WHERE c.publicacion_id = $1
             ORDER BY c.fecha_creacion ASC`,
            [id]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
};