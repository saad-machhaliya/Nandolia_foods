var express = require('express');
var router = express.Router();

var app=express();
var con = require('../public/javascripts/connection');
var bodyParser = require('body-parser');
 app.use(bodyParser.json());

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('admin');
  });

  
  // router.post('/admin', (req, res) => {
  //   const { username, password } = req.body;
  
  //   if (username === 'saad' && password === '1234') {
  //     res.redirect('/dashboard');
  //   } else {
  //     res.send('Invalid username or password.');
  //   }
  // });
  


module.exports = router;
