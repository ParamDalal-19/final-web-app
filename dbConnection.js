var mysql = require('mysql');
var conn = mysql.createConnection({
    host:"127.0.0.1",
    user:"tej",
    password:"123",
    database:"node_app"
}); 
 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;