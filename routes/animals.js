var express = require('express');
var router = express.Router();
var db = require('../config');
 

router.get('/', function(req, res, next) {      
    db.query('SELECT * FROM animals',function(err,results)     {
        if(err) throw err;
        res.send(results);
    });
});

router.post('/', (req, res, next) => {    
    let name = req.body.name;
    let age = req.body.age;
    let entry_date = req.body.entry_date;
    let out_date = req.body.out_date;
    let birthdate = req.body.birthdate;
    let available = req.body.available;
    let identification_number = req.body.identification_number;
    db.query('INSERT INTO animals (Name) VALUES (?)', [name], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
    
});

module.exports = router;