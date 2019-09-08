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
            message: 'Welcome! What would you like to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Quit']
        }
    ]).then(function(res) {
        switch(res.choice) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                lowInventory();
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

  function viewProducts() {
    connection.query('SELECT * FROM Products', function(err, res) {
        if (err) throw err;
        var table = new Table ({
            head: ['Id', 'Product', 'Department', 'Price', 'Stock'],
        })
        for(i = 0; i < res.length; i++) {
            table.push (
                [res[i].id, res[i].prodName, res[i].department, res[i].price, res[i].stock]
            )
        }
        console.log(table.toString());
        startMenu();
    })
  }

  function lowInventory() {
      connection.query('SELECT * FROM products WHERE stock < 5', function(err, res) {
          if (err) throw err;
          var table = new Table ({
            head: ['Id', 'Product', 'Department', 'Price', 'Stock'],
        })
        for(i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].prodName, res[i].department, res[i].price, res[i].stock]
            )
        }
        console.log('\nShowing all items with low inventory\n')
        console.log(table.toString() + '\n');
        startMenu();
      })
  }