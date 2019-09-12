var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  startUp();
});

function startUp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Welcome to Bamazon!",
        choices: ["See Product Selection", "Quit"]
      }
    ])
    .then(function(res) {
      switch (res.choice) {
        case "See Product Selection":
          shopping();
          break;
        case "Quit":
          console.log("Goodbye!");
          connection.end();
          break;
      }
    });
}

function shopping() {
  connection.query("SELECT * FROM Products", function(err, res) {
    if (err) throw err;
    var table = new Table({
      head: ["Id", "Product", "Department", "Price", "Stock"]
    });
    for (i = 0; i < res.length; i++) {
      table.push([
        res[i].id,
        res[i].prodName,
        res[i].department,
        res[i].price,
        res[i].stock
      ]);
    }
    console.log(table.toString());
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: ["Buy a Product", "Go Back to Home", "Quit"]
        }
      ])
      .then(function(res) {
        switch (res.action) {
          case "Buy a Product":
            buyMode();
            break;
          case "Go Back to Home":
            startUp();
            break;
          case "Quit":
            console.log("Goodbye!");
            connection.end();
            break;
        }
      });
  });
}

function buyMode() {
  inquirer
    .prompt([
      {
        type: "number",
        name: "selection",
        message: "Which item would you like to purchase? (input the Id number)"
      },
      {
        type: "number",
        name: "amount",
        message: "How many would you like to buy?"
      }
    ])
    .then(function(res) {
      connection.query(
        "SELECT * FROM Products WHERE ?",
        { id: res.selection },
        function(err, response) {
          if (err) throw err;
            var total = Number(res.amount) * Number(response[0].price);
            var newStock = response[0].stock - res.amount;
            if(response[0].stock <= 0 || newStock < 0){
              console.log('There is insuficiant stock to complete this order. Please try again.')
              startUp();
            }else {
              console.log(
                `You have purchased ${res.amount} ${
                  response[0].prodName
                }(s) for $${total.toFixed(2)}!`
              );
              var saleUpdate = response[0].product_sales + total;
              connection.query(
                "UPDATE Products SET ?, ? WHERE ?",
                [
                  { stock: `${newStock}` },
                  { product_sales: `${saleUpdate}` },
                  { id: `${res.selection}` }
                ],
                function(err, res) {
                  if (err) throw err;
                  console.log(res.affectedRows + " stock updated\n");
                  shopping();
                }
              );
            }
        }
      );
    });
}
