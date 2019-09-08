var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table')

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
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Welcome!\n What would you like to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Quit']
        }
    ]).then(function(res) {
        switch(res.choice) {
            case 'View Products for Sale':
                break;
            case 'View Low Inventory':
                break;
            case 'Add to Inventory':
                break;
            case 'Add New Product':
                break;
            case 'Quit':
                console.log('Goodbye!');
                connection.end();
                break;
        }
    })
  }