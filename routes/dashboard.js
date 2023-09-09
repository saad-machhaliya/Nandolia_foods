var express = require('express');
var router = express.Router();

const multer = require('multer');

var app=express();
var bodyParser = require('body-parser');
 app.use(bodyParser.json());
 var con = require('../public/javascripts/connection');

 router.get('/login_master', function(req, res, next) {
  
  var sql = "select * from login_table";

  con.query(sql, function(error, results){
    if(error) console.log(error);
    res.render("login_master",{usersData:results});
  }) 
  // res.render("login_master",{usersData:results});
});

router.post('/', function(req, res, next) {

  let username = req.body.username;
  let password = req.body.password;

  var sql ="select * from login_table where username=? and password=?";

  con.query(sql,[username,password], function(error,results){
    if(error) throw error;
// console.log("yes");
    if (results.length > 0) {
      res.render("dashboard",{usersData:results});
    } else {
      res.redirect('/admin');
    }
  })
  // res.render("/dashboard");
})

router.get('/login_master/delete_user', (req, res)=> {

  var sql = "delete from login_table where id=?";

  var id = req.query.id;

  con.query(sql,[id], function(error, result){
    if(error) console.log(error); 
    res.redirect('/dashboard/login_master');

  })
});

router.get('/login_master/update_user', (req, res)=> {

  var sql = "select * from login_table where id=?";

  var id = req.query.id;

  con.query(sql,[id], function(error, result){
    if(error) console.log(error);
    res.render('update_user',{usersData:result});

  })
});

router.post('/login_master/update_user', (req, res)=> {

var username = req.body.username;
var password = req.body.password;
var id = req.body.id;

  var sql = "UPDATE login_table set username=?, password=? where id=?";

  con.query(sql,[username,password,id], function(error, result){
    if(error) console.log(error);
    res.redirect('/dashboard/login_master');
  })
});

// ........................................... login   insert  start           ,,,,,,,,,,...............

router.get('/login_master/insert_user', (req, res)=> {

  var sql = "select * from login_table";

  var id = req.query.id;

  con.query(sql,[id], function(error, result){
    if(error) console.log(error);
    res.render('insert_user',{usersData:result});

  })
});

router.post('/login_master/insert_user', (req, res)=> {

var username = req.body.username;
var password = req.body.password;


var sql = "INSERT INTO login_table (username,password) VALUES (?, ?)";  

  con.query(sql,[username,password], function(error, result){
    if(error) console.log(error);
    res.redirect('/dashboard/login_master');
  })
});

// login_master end here.............................................................................

// products  category strt....................................................................

router.get('/products_category', function(req, res, next) {
  var sql = "select * from product_category";

  var id = req.query.id;

  con.query(sql,[id], function(error, results){
    if(error) console.log(error);
  res.render('products_category',{usersData:results});
})
});

router.get('/products_category/insert_products_category', (req, res)=> {

  var sql = "select * from product_category";

  var id = req.query.id;

  con.query(sql,[id], function(error, results){
    if(error) console.log(error);
    res.render('insert_products_category',{usersData:results});

  })
});
var storage = multer.diskStorage({
destination: "public/images",
filename: function(req, file, cb) {
  cb(null, file.originalname);
}
});
var upload = multer({ storage: storage });

router.post('/products_category',upload.single('myimage'), (req, res,next)=> {
var name = req.body.name;
var product_desc = req.body.product_desc;
var image = req.file.originalname;

console.log("post ho raha he");

var sql = "INSERT INTO product_category (name,image,product_desc) VALUES (?, ?, ?)";  
var params = [name, image, product_desc];

  con.query(sql,params, function(error, results){
    
    if (error) {
      res.send('Error adding record');
    }
      res.redirect('/dashboard/products_category');

    // if (results.length > 0) {
    //   res.redirect('/dashboard/products_category',{usersData:results});
    // } else {
    //   res.redirect('/dashboard/products_category/insert_products_category');
    // }
  })
});

router.get('/products_category/delete_products_category', (req, res)=> {

  var sql = "delete from product_category where id=?";

  var id = req.query.id;

  con.query(sql,[id], function(error, result){
    if(error) console.log(error); 
     res.redirect('/dashboard/products_category');

  })
});


router.get('/products_category/update_products_category', (req, res)=> {

  var sql = "select * from product_category where id=?";

  var id = req.query.id;

  con.query(sql,[id], function(error, result){
    if(error) console.log(error);
    res.render('update_products_category',{usersData:result}); 

  })
});

router.post('/products_category/update_products_category',upload.single('myimage'), (req, res)=> {
  
var id = req.body.id;
var name = req.body.name;
var product_desc = req.body.product_desc;
// let image = req.file.originalname;
var image;

if (req.file) {
  image = req.file.originalname;
} else {
  image = req.body.old_image;
}
  var sql = "UPDATE product_category set name=?, product_desc=?, image=? where id=?";

  con.query(sql,[name,product_desc,image,id], function(error, result){
    if(error) console.log(error);
    res.redirect('/dashboard/products_category');
  })
});



// products  category end here....................................................................


// products  start   here....................................................................

// router.get('/products', function(req, res, next) {
//   res.render('products');
// });

router.get('/products', function(req, res, next) {
  var sql = "select * from products_table";

  var item_id = req.query.item_id;

  con.query(sql,[item_id], function(error, results){
    if(error) console.log(error);
  res.render('products',{usersData:results});
})
});

router.get('/products/insert_products', (req, res)=> {

  var sql = "select * from products_table";

  var item_id = req.query.item_id;

  con.query(sql,[item_id], function(error, results){
    if(error) console.log(error);
    res.render('insert_products',{usersData:results});

  })
});
// var storage = multer.diskStorage({
// destination: "public/images",
// filename: function(req, file, cb) {
//   cb(null, file.originalname);
// }
// });
// var upload = multer({ storage: storage });

router.post('/products',upload.single('myimage'), (req, res,next)=> {
var item_name = req.body.item_name;
var item_price = req.body.item_price;
var cat_id = req.body.cat_id;
var item_image = req.file.originalname;

console.log("post ho raha he");

var sql = "INSERT INTO products_table (item_name,item_image,item_price,cat_id) VALUES (?, ?, ?, ?)";  
var params = [item_name, item_image, item_price,cat_id];

  con.query(sql,params, function(error, results){
    
    if (error) {
      res.send('Error adding record');
    }
      res.redirect('/dashboard/products');

    // if (results.length > 0) {
    //   res.redirect('/dashboard/products',{usersData:results});
    // } else {
    //   res.redirect('/dashboard/products/insert_products');
    // }
  })
});

router.get('/products/delete_products', (req, res)=> {

  var sql = "delete from products_table where item_id=?";

  var item_id = req.query.item_id;

  con.query(sql,[item_id], function(error, result){
    if(error) console.log(error); 
     res.redirect('/dashboard/products');

  })
});


router.get('/products/update_products', (req, res)=> {

  var sql = "select * from products_table where item_id=?";

  var item_id = req.query.item_id;

  con.query(sql,[item_id], function(error, result){
    if(error) console.log(error);
    res.render('update_products',{usersData:result}); 

  })
});

router.post('/products/update_products',upload.single('myimage'), (req, res)=> {
  
var item_id = req.body.item_id;
var item_name = req.body.item_name;
var item_price = req.body.item_price;
var cat_id = req.body.cat_id;
// let item_image = req.file.originalname;
var item_image;

if (req.file) {
  item_image = req.file.originalname;
} else {
  item_image = req.body.old_image;
}
  var sql = "UPDATE products_table set item_name=?, item_price=?, cat_id=?, item_image=? where item_id=?";

  con.query(sql,[item_name,item_price,cat_id,item_image,item_id], function(error, result){
    if(error) console.log(error);
    res.redirect('/dashboard/products');
  })
});


module.exports = router;

