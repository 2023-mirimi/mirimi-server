const mysql = require('mysql');
const path = require('path');

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port: '3306',
    user     : 'mirimi',
    password : '1234',
    database : 'mirimi'
});

module.exports = connection;