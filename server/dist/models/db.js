"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2');
/* const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: '123456789',
    password: '',
    database: 'sistema_medico',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
export default connection */
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection = new pg_1.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: {
        rejectUnauthorized: false // Permite conexiones sin verificación del certificado. Ajustar según necesidad.
    }
});
connection.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));
exports.default = connection;
