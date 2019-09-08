var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
  });

  connection.connect(function(err) {
      if(err) throw err;
      console.log('Connected as id ' + connection.threadId);
      startMenu();
  })

function startMenu() {
    console.log('Welcome!');
    inquirer.prompt([
        {
            type: 'list',
            name: 'startChoice',
            message: 'What would you like to do?',
            choices: [
                'View Products Sales by Department',
                'Create New Department',
                'Quit'
            ]
        }
    ]).then(function(res) {
        switch(res.startChoice) {
            case 'View Products Sales by Department':
                break;
            case 'Create New Department':
                break;
            case 'Quit':
                console.log('Goodbye!');
                connection.end();
                break;
        }
    })
}