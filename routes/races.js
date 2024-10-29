var express = require('express');
var router = express.Router();
var db = require('../config');
 

router.get('/', function(req, res, next) {      
    db.query('SELECT * FROM races',function(err,results)     {
        if(err) throw err;
        res.send(results);
    });
});

router.post('/', (req, res, next) => {    
    let name = req.body;
    db.query('INSERT INTO races (Name) VALUES (?)', [name], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
    
});

module.exports = router;