import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import connection from '../models/db';
import jwt from 'jsonwebtoken';

export const ObtenerMedicos = async (req: Request, res: Response) => {
  try {
    // Realizar la consulta a la base de datos
    const medicos: any = await new Promise((resolve, reject) => {
      connection.query('SELECT * FROM medicos', (error: any, results: any) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    // Respuesta exitosa con los datos obtenidos
    res.status(200).json(medicos.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los médicos' });
  }
};

export const CrearMedico = async (req: Request, res: Response) => {
  const { nombre, apellido, especialidad, numero_colegiado, email, telefono } = req.body;

  try {
      const { rows } = await connection.query(
          `INSERT INTO medicos (nombre, apellido, especialidad, email, telefono)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`,
          [nombre, apellido, especialidad, email, telefono]
      );

      res.status(201).json({ message: 'Médico creado exitosamente', id: rows[0].id });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el médico' });
  }
};