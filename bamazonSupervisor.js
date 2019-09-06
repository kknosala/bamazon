var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "3415671Tucker.",
    database: "bamazon_db"
  });

  connection.connect(function(err) {
      if(err) throw err;
      console.log('Connected as id ' + connection.threadId);
      connection.end();
  })