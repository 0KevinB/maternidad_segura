import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import connection from '../models/db';
import jwt from 'jsonwebtoken';

export const CrearUsuario = async (req: Request, res: Response) => {
  const { nombre, apellido, correo, contraseña, fecha_nacimiento, telefono } = req.body;
  console.log(nombre)
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
        INSERT INTO usuario (nombre, apellido, correo, contraseña, fecha_nacimiento, telefono)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      connection.query(
        sql,
        [nombre, apellido, correo, hashedPassword, fecha_nacimiento, telefono],
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
export const CrearDatosMedicos = async (req: Request, res: Response) => {
  const {
    usuario_id,
    alguna_medicacion,
    altura,
    peso,
    hipertiroidismo,
    hipotiroidismo,
    hipertension,
    asma,
    cancer,
    ETS,
    ansiedad,
    depresion,
    diabetes,
    enfermedad_cardiaca,
    enfermedad_renal
  } = req.body;

  // Validación de entrada
  if (!usuario_id || altura === undefined || peso === undefined) {
    return res.status(400).json({ message: 'Usuario ID, altura y peso son campos obligatorios' });
  }

  try {
    // Insertar los datos médicos en la base de datos
    await new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO datos_medicos (
          usuario_id,
          alguna_medicacion,
          altura,
          peso,
          hipertiroidismo,
          hipotiroidismo,
          hipertension,
          asma,
          cancer,
          ETS,
          ansiedad,
          depresion,
          diabetes,
          enfermedad_cardiaca,
          enfermedad_renal
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      connection.query(
        sql,
        [
          usuario_id,
          alguna_medicacion,
          altura,
          peso,
          hipertiroidismo,
          hipotiroidismo,
          hipertension,
          asma,
          cancer,
          ETS,
          ansiedad,
          depresion,
          diabetes,
          enfermedad_cardiaca,
          enfermedad_renal
        ],
        (error: any, results: any) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    // Respuesta exitosa
    res.status(201).json({ message: 'Datos médicos creados exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear los datos médicos' });
  }
};
export const CrearAntecedentesObstetricos = async (req: Request, res: Response) => {
  const {
    usuario_id,
    embarazos_previos,
    preeclampsia,
    parto_prematuro,
    hemorragias,
    perdida
  } = req.body;

  // Validación de entrada
  if (!usuario_id || embarazos_previos === undefined) {
    return res.status(400).json({ message: 'Usuario ID y embarazos previos son campos obligatorios' });
  }

  try {
    // Insertar los antecedentes obstétricos en la base de datos
    await new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO antecedentes_obstetricos (
          usuario_id,
          embarazos_previos,
          preeclampsia,
          parto_prematuro,
          hemorragias,
          perdida
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;
      connection.query(
        sql,
        [
          usuario_id,
          embarazos_previos,
          preeclampsia,
          parto_prematuro,
          hemorragias,
          perdida
        ],
        (error: any, results: any) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    // Respuesta exitosa
    res.status(201).json({ message: 'Antecedentes obstétricos creados exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear los antecedentes obstétricos' });
  }
};
export const CrearEmbarazoActual = async (req: Request, res: Response) => {
  const {
    usuario_id,
    enfermedad_actual,
    bajo_liquido_amniotico,
    alto_liquido_amniotico,
    anomalia_fetal,
    crecimiento_disminuido,
    in_vitro,
    gestacion_multiple,
    semanas_embarazo,
    numero_fetos
  } = req.body;

  // Validación de entrada
  if (!usuario_id || semanas_embarazo === undefined || numero_fetos === undefined) {
    return res.status(400).json({ message: 'Usuario ID, semanas de embarazo y número de fetos son campos obligatorios' });
  }

  try {
    // Insertar la información del embarazo actual en la base de datos
    await new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO embarazo_actual (
          usuario_id,
          enfermedad_actual,
          bajo_liquido_amniotico,
          alto_liquido_amniotico,
          anomalia_fetal,
          crecimiento_disminuido,
          in_vitro,
          gestacion_multiple,
          semanas_embarazo,
          numero_fetos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      connection.query(
        sql,
        [
          usuario_id,
          enfermedad_actual,
          bajo_liquido_amniotico,
          alto_liquido_amniotico,
          anomalia_fetal,
          crecimiento_disminuido,
          in_vitro,
          gestacion_multiple,
          semanas_embarazo,
          numero_fetos
        ],
        (error: any, results: any) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    // Respuesta exitosa
    res.status(201).json({ message: 'Información del embarazo actual creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la información del embarazo actual' });
  }
};
export const CrearHabitos = async (req: Request, res: Response) => {
  const {
    usuario_id,
    bebidas_alcoholicas,
    tipo_alcohol,
    frecuencia_alcohol,
    drogas,
    tipo_droga,
    frecuencia_droga,
    tabaco,
    frecuencia_tabaco,
    hogar_libre_tabaco
  } = req.body;

  // Validación de entrada
  if (!usuario_id) {
    return res.status(400).json({ message: 'Usuario ID es un campo obligatorio' });
  }

  try {
    // Insertar los hábitos en la base de datos
    await new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO habitos (
          usuario_id,
          bebidas_alcoholicas,
          tipo_alcohol,
          frecuencia_alcohol,
          drogas,
          tipo_droga,
          frecuencia_droga,
          tabaco,
          frecuencia_tabaco,
          hogar_libre_tabaco
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      connection.query(
        sql,
        [
          usuario_id,
          bebidas_alcoholicas,
          tipo_alcohol,
          frecuencia_alcohol,
          drogas,
          tipo_droga,
          frecuencia_droga,
          tabaco,
          frecuencia_tabaco,
          hogar_libre_tabaco
        ],
        (error: any, results: any) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    // Respuesta exitosa
    res.status(201).json({ message: 'Hábitos creados exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear los hábitos' });
  }
};
export const CrearNutricion = async (req: Request, res: Response) => {
  const {
    usuario_id,
    dieta,
    frutas,
    verduras,
    carnes,
    comida_rapida,
    legumbres,
    mariscos,
    lacteos,
    numero_comidas
  } = req.body;

  // Validación de entrada
  if (!usuario_id) {
    return res.status(400).json({ message: 'Usuario ID es un campo obligatorio' });
  }

  try {
    // Insertar la información nutricional en la base de datos
    await new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO nutricion (
          usuario_id,
          dieta,
          frutas,
          verduras,
          carnes,
          comida_rapida,
          legumbres,
          mariscos,
          lacteos,
          numero_comidas
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      connection.query(
        sql,
        [
          usuario_id,
          dieta,
          frutas,
          verduras,
          carnes,
          comida_rapida,
          legumbres,
          mariscos,
          lacteos,
          numero_comidas
        ],
        (error: any, results: any) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    // Respuesta exitosa
    res.status(201).json({ message: 'Información nutricional creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la información nutricional' });
  }
};
export const CrearActividadFisica = async (req: Request, res: Response) => {
  const {
    usuario_id,
    actividad_fisica,
    frecuencia_actividad,
    tiempo_actividad
  } = req.body;

  // Validación de entrada
  if (!usuario_id) {
    return res.status(400).json({ message: 'Usuario ID es un campo obligatorio' });
  }

  try {
    // Insertar la información de actividad física en la base de datos
    await new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO actividad_fisica (
          usuario_id,
          actividad_fisica,
          frecuencia_actividad,
          tiempo_actividad
        ) VALUES (?, ?, ?, ?)
      `;
      connection.query(
        sql,
        [
          usuario_id,
          actividad_fisica,
          frecuencia_actividad,
          tiempo_actividad
        ],
        (error: any, results: any) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    // Respuesta exitosa
    res.status(201).json({ message: 'Información de actividad física creada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la información de actividad física' });
  }
};
