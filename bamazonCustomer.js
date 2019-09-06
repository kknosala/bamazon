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
                shopping();
                break;
            case 'Quit':
                console.log('Goodbye!');
                connection.end();
                break;
          }
      })
  }

  function shopping() {
    connection.query('SELECT id, prodName, department, price, stock FROM Products', function(err, res) {
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
    })
  }