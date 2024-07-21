import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import connection from '../models/db';
import jwt from 'jsonwebtoken';

export const ObtenerMedicos = async (req: Request, res: Response) => {
  try {
    // Realizar la consulta a la base de datos
    const medicos = await new Promise((resolve, reject) => {
      connection.query('SELECT * FROM medicos', (error: any, results: any) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    // Respuesta exitosa con los datos obtenidos
    res.status(200).json(medicos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los médicos' });
  }
};