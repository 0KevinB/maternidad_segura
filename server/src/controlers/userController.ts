import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import connection from '../models/db';
import jwt from 'jsonwebtoken';

export const CrearUsuario = async (req: Request, res: Response) => {
  const { nombre, correo, contraseña, fecha_nacimiento } = req.body;

  // Validación de entrada
  if (!nombre || !correo || !contraseña || !fecha_nacimiento) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el correo ya existe
    const existingUser = await new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM usuario WHERE correo = ?',
        [correo],
        (error: any, results: any) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    if ((existingUser as any).length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(contraseña, salt);

    // Insertar el usuario en la base de datos
    await new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO usuario (nombre, correo, contraseña, fecha_nacimiento)
        VALUES (?, ?, ?, ?)
      `;
      connection.query(
        sql,
        [nombre, correo, hashedPassword, fecha_nacimiento],
        (error: any, results: any) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    // Respuesta exitosa
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};
export const LoginUsuario = async (req: Request, res: Response) => {
  const { correo, contraseña } = req.body;

  // Validación de entrada
  if (!correo || !contraseña) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el usuario existe
    const existingUser = await new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM usuario WHERE correo = ?',
        [correo],
        (error: any, results: any) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    if ((existingUser as any).length === 0) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const usuario = (existingUser as any)[0];

    // Verificar la contraseña
    const contraseñaValida = bcrypt.compareSync(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Generar JWT (puedes comentar esta parte si no es necesaria por ahora)
    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.SECRET_KEY || '123'
        );

    // Respuesta exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};