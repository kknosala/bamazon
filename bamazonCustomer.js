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
      startUp();
  })

  function startUp() {
      inquirer.prompt([
          {
              type: 'list',
              name: 'choice',
              message: 'What would you like to do?',
              choices: ['Buy Something', 'Quit']
          }
      ]).then(function(res) {
          switch(res.choice) {
            case 'Buy Something':
                console.log('Test Text');
                startUp();
                break;
            case 'Quit':
                console.log('Goodbye!');
                connection.end();
                break;
          }
      })
  }