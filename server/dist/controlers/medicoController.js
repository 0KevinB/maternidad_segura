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
exports.ObtenerMedicos = void 0;
const db_1 = __importDefault(require("../models/db"));
const ObtenerMedicos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Realizar la consulta a la base de datos
        const medicos = yield new Promise((resolve, reject) => {
            db_1.default.query('SELECT * FROM medicos', (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
        // Respuesta exitosa con los datos obtenidos
        res.status(200).json(medicos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los médicos' });
    }
});
exports.ObtenerMedicos = ObtenerMedicos;
