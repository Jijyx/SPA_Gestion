const mysql = require('mysql');

const db = mysql.createConnection ({host: 'localhost', database: 'SPA_Gestion'});

module.exports = db;