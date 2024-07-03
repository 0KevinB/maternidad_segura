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
exports.LoginUsuario = exports.CrearUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../models/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CrearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, contraseña, fecha_nacimiento } = req.body;
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
        INSERT INTO usuario (nombre, correo, contraseña, fecha_nacimiento)
        VALUES (?, ?, ?, ?)
      `;
            db_1.default.query(sql, [nombre, correo, hashedPassword, fecha_nacimiento], (error, results) => {
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
