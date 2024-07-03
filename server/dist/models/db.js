"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'sistema_medico',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = connection;
