var express = require('express');
var router = express.Router();
const db = require('../db')
 

router.get('/', function(req, res, next) {      
    db.query("SELECT name FROM species", function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
});
})

// Create a new specie
router.post('/add', (req, res) => {
    console.log(req.body.name)
    const {name} = req.body;
    db.query('INSERT INTO species (name) VALUES (?)', [name], (err, result) => {
      if (err) throw err;
      res.json({ message: 'specie added successfully', id: result.insertId });
    });
  });


router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    db.query('SELECT * FROM species WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'User not found with id = ' + id)
            res.redirect('/species')
        }
        else {
            res.render('species/edit', {
                title: 'Edit User', 
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email,
                position: rows[0].position
            })
        }
    })
})

router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let errors = false;

    if(name.length === 0 || email.length === 0 || position.length === 0) {
        errors = true;
        req.flash('error', "Please enter name and email and position");
        res.render('species/edit', {
            id: req.params.id,
            name: name,
            email: email,
            position:position
        })
    }
    if( !errors ) {   
 
        var form_data = {
            name: name,
            email: email,
            position:position
        }
        db.query('UPDATE species SET ? WHERE id = ' + id, form_data, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('species/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    email: form_data.email,
                    position: form_data.position
                })
            } else {
                req.flash('success', 'User successfully updated');
                res.redirect('/species');
            }
        })
    }
})
   
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    db.query('DELETE FROM species WHERE id = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/species')
        } else {
            req.flash('success', 'User successfully deleted! ID = ' + id)
            res.redirect('/species')
        }
    })
})

module.exports = router;