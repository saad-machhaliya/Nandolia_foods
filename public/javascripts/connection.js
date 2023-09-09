var mysql = require('mysql'); 
 
var con = mysql.createConnection({  
host: "localhost",
user: "root",  
password: "",
database:"nandoliafoods_db"
});

con.connect(function(error) {  
if (error) throw error;  
console.log("Connected!"); 

});  

module.exports=con;