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

import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
console.log('DB_HOST:', process.env.DB_HOST);
export default connection;