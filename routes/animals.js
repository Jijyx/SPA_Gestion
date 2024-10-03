var express = require('express');
var router = express.Router();
const db = require('../db')
 

router.get('/', function(req, res, next) {      
    db.query("SELECT * FROM animal_summary", function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
});
})

// Create a new specie
router.post('/', (req, res) => {
    
    const {Name, Age, Entry_Date, Available} = req.body;
    console.log(Name, Age, Entry_Date, Available)
    db.query("INSERT INTO animal (name, age, Entry_Date, Available) VALUES (?,?,?,?)",[Name, Age, Entry_Date, Available], (err, result) => {
      if (err) throw err;
      res.json({ message: 'animal added successfully', id: result.insertId });
    });
  });


module.exports = router;