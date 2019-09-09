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
                departSales();
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

function departSales() {
    connection.query("SELECT departments.department_id, products.department, departments.over_head_costs, SUM(product_sales) FROM products LEFT JOIN departments ON departments.department = products.department GROUP BY department", function(err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["Department ID", "Department", "Over Head Costs", 'Total Product Sales', 'Profit']
        });
        for (i = 0; i < res.length; i++) {
            var profit = (res[i]['SUM(product_sales)']).toFixed(2) - (res[i].over_head_costs).toFixed(2)
            table.push([
              res[i].department_id,
              res[i].department,
              '$' + (res[i].over_head_costs).toFixed(2),
              '$' + (res[i]['SUM(product_sales)']).toFixed(2),
              profit.toFixed(2)
            ]);
        }
        console.log("\n" + table.toString() + "\n");
        startMenu();
    })
}