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
exports.CrearActividadFisica = exports.CrearNutricion = exports.CrearHabitos = exports.CrearEmbarazoActual = exports.CrearAntecedentesObstetricos = exports.CrearDatosMedicos = exports.LoginUsuario = exports.CrearUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../models/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CrearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, correo, contraseña, fecha_nacimiento, telefono } = req.body;
    console.log(nombre);
    // Validación de entrada
    if (!nombre || !correo || !contraseña || !fecha_nacimiento) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try {
        // Verificar si el correo ya existe
        const existingUser = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM usuario WHERE correo = ?', [correo], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }
        // Encriptar la contraseña
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(contraseña, salt);
        // Insertar el usuario en la base de datos
        yield new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO usuario (nombre, apellido, correo, contraseña, fecha_nacimiento, telefono)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
            db_1.default.query(sql, [nombre, apellido, correo, hashedPassword, fecha_nacimiento, telefono], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});
exports.CrearUsuario = CrearUsuario;
const LoginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contraseña } = req.body;
    // Validación de entrada
    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try {
        // Verificar si el usuario existe
        const existingUser = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM usuario WHERE correo = ?', [correo], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        if (existingUser.length === 0) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }
        const usuario = existingUser[0];
        // Verificar la contraseña
        const contraseñaValida = bcrypt_1.default.compareSync(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }
        // Generar JWT (puedes comentar esta parte si no es necesaria por ahora)
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, correo: usuario.correo }, process.env.SECRET_KEY || '123');
        // Respuesta exitosa
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});
exports.LoginUsuario = LoginUsuario;
const CrearDatosMedicos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, alguna_medicacion, altura, peso, hipertiroidismo, hipotiroidismo, hipertension, asma, cancer, ETS, ansiedad, depresion, diabetes, enfermedad_cardiaca, enfermedad_renal } = req.body;
    // Validación de entrada
    if (!usuario_id || altura === undefined || peso === undefined) {
        return res.status(400).json({ message: 'Usuario ID, altura y peso son campos obligatorios' });
    }
    try {
        // Insertar los datos médicos en la base de datos
        yield new Promise((resolve, reject) => {
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
            db_1.default.query(sql, [
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
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Datos médicos creados exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear los datos médicos' });
    }
});
exports.CrearDatosMedicos = CrearDatosMedicos;
const CrearAntecedentesObstetricos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, embarazos_previos, preeclampsia, parto_prematuro, hemorragias, perdida } = req.body;
    // Validación de entrada
    if (!usuario_id || embarazos_previos === undefined) {
        return res.status(400).json({ message: 'Usuario ID y embarazos previos son campos obligatorios' });
    }
    try {
        // Insertar los antecedentes obstétricos en la base de datos
        yield new Promise((resolve, reject) => {
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
            db_1.default.query(sql, [
                usuario_id,
                embarazos_previos,
                preeclampsia,
                parto_prematuro,
                hemorragias,
                perdida
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Antecedentes obstétricos creados exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear los antecedentes obstétricos' });
    }
});
exports.CrearAntecedentesObstetricos = CrearAntecedentesObstetricos;
const CrearEmbarazoActual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, enfermedad_actual, bajo_liquido_amniotico, alto_liquido_amniotico, anomalia_fetal, crecimiento_disminuido, in_vitro, gestacion_multiple, semanas_embarazo, numero_fetos } = req.body;
    // Validación de entrada
    if (!usuario_id || semanas_embarazo === undefined || numero_fetos === undefined) {
        return res.status(400).json({ message: 'Usuario ID, semanas de embarazo y número de fetos son campos obligatorios' });
    }
    try {
        // Insertar la información del embarazo actual en la base de datos
        yield new Promise((resolve, reject) => {
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
            db_1.default.query(sql, [
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
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Información del embarazo actual creada exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la información del embarazo actual' });
    }
});
exports.CrearEmbarazoActual = CrearEmbarazoActual;
const CrearHabitos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, bebidas_alcoholicas, tipo_alcohol, frecuencia_alcohol, drogas, tipo_droga, frecuencia_droga, tabaco, frecuencia_tabaco, hogar_libre_tabaco } = req.body;
    // Validación de entrada
    if (!usuario_id) {
        return res.status(400).json({ message: 'Usuario ID es un campo obligatorio' });
    }
    try {
        // Insertar los hábitos en la base de datos
        yield new Promise((resolve, reject) => {
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
            db_1.default.query(sql, [
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
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Hábitos creados exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear los hábitos' });
    }
});
exports.CrearHabitos = CrearHabitos;
const CrearNutricion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, dieta, frutas, verduras, carnes, comida_rapida, legumbres, mariscos, lacteos, numero_comidas, numero_vasos, comidas_fuera_casa } = req.body;
    // Validación de entrada
    if (!usuario_id) {
        return res.status(400).json({ message: 'Usuario ID es un campo obligatorio' });
    }
    try {
        // Insertar la información nutricional en la base de datos
        yield new Promise((resolve, reject) => {
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
          numero_comidas,
          numero_vasos,
          comidas_fuera_casa
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
            db_1.default.query(sql, [
                usuario_id,
                dieta,
                frutas,
                verduras,
                carnes,
                comida_rapida,
                legumbres,
                mariscos,
                lacteos,
                numero_comidas,
                numero_vasos,
                comidas_fuera_casa
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Información nutricional creada exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la información nutricional' });
    }
});
exports.CrearNutricion = CrearNutricion;
const CrearActividadFisica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario_id, actividad_fisica, frecuencia_actividad, tiempo_actividad } = req.body;
    // Validación de entrada
    if (!usuario_id) {
        return res.status(400).json({ message: 'Usuario ID es un campo obligatorio' });
    }
    try {
        // Insertar la información de actividad física en la base de datos
        yield new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO actividad_fisica (
          usuario_id,
          actividad_fisica,
          frecuencia_actividad,
          tiempo_actividad
        ) VALUES (?, ?, ?, ?)
      `;
            db_1.default.query(sql, [
                usuario_id,
                actividad_fisica,
                frecuencia_actividad,
                tiempo_actividad
            ], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa
        res.status(201).json({ message: 'Información de actividad física creada exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la información de actividad física' });
    }
});
exports.CrearActividadFisica = CrearActividadFisica;
