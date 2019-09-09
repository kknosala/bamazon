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
    veiwDepart();
  })

  function veiwDepart() {
    connection.query('SELECT * FROM departments', function(err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["Department ID", "Department", "Over Head Costs"]
        });
        for(i = 0; i < res.length; i++) {
            table.push([
                res[i].department_id,
                res[i].department,
                '$' + (res[i].over_head_costs).toFixed(2)
            ])
        }
        console.log("\n" + table.toString() + "\n");
        startMenu();
    })
}

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
                addDepartConfirm();
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

function addDepartConfirm() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Are you sure you want to add a new department?',
            defaut: true
        }
    ]).then(function(res) {
        switch(res.confirm) {
            case true:
                addDepart();
                break;
            case false:
                console.log('Going back to main menu...\n')
                veiwDepart();
                break;
        }
    })
}

function addDepart() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newdepart',
            message: 'What is the name of the new department?'
        },
        {
            type: 'number',
            name: 'newOver',
            message: 'What is the overhead on the new department?'
        }
    ]).then(function(res) {
        connection.query(`INSERT INTO departments (department, over_head_costs) VALUES ('${res.newdepart}', '${res.newOver}')`, function(err, response) {
            if (err) throw err;
            console.log(response.affectedRows + " department added\n");
            veiwDepart();
        })
    })
}

