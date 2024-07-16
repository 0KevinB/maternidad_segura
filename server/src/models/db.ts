const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: '123456789',
    password: '',
    database: 'sistema_medico',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
export default connection