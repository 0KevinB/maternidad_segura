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

import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Client({
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

export default connection;
