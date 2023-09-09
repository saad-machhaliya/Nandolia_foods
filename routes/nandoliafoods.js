var express = require('express');
var router = express.Router();

var app=express();
var bodyParser = require('body-parser');
 app.use(bodyParser.json());
 var con = require('../public/javascripts/connection');



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('nandoliafoods');
// });

router.get('/', function(req, res, next) {
  var sql = "select * from product_category";

  var id = req.query.id;

  con.query(sql,[id], function(error, results){
    if(error) console.log(error);
  res.render('nandoliafoods',{usersData:results});
})
});

router.get('/footer', function(req, res, next) {
  res.render('footer');
});

router.get('/header', function(req, res, next) {
  res.render('header');
});

// router.get('/chutney', function(req, res, next) {
//   res.render('chutney');
// });

router.get('/product/:name', function(req, res, next) {
  //get pramaneter name from url
  // get catagory id from product catagory table using name
  //store category id to variable
  //fetch product from product_table where cat_id= ? id
console.log(req.params)
//step 1
var cat_name = req.params.name;
var cat_id=0;
//step2
var sql = "select id from product_category where name = ?";
con.query(sql,[cat_name], function(error, results){
  if(error) console.log(error);
  cat_id = results[0].id;

  var sql = "select * from products_table where cat_id=?";
  
  con.query(sql,[cat_id], function(error, results){
   if(error) console.log(error);
   res.render('product',{usersData:results});
 });  
});
//step3
});




module.exports = router;
