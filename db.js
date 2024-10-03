const mysql = require('mysql');

const db = mysql.createConnection({host: "localhost", user:"root", database: "SPA_Gestion"});

module.exports = db;