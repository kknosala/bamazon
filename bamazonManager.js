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
  startMenu();
});

function startMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Welcome! What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Quit"
        ]
      }
    ])
    .then(function(res) {
      switch (res.choice) {
        case "View Products for Sale":
          viewProducts();
          break;
        case "View Low Inventory":
          lowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addItemPrompt();
          break;
        case "Quit":
          console.log("Goodbye!");
          connection.end();
          break;
      }
    });
}

function viewProducts() {
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
    startMenu();
  });
}

function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock < 5", function(
    err,
    res
  ) {
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
    console.log("\nShowing all items with low inventory\n");
    console.log(table.toString() + "\n");
    startMenu();
  });
}

function addInventory() {
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
    console.log("\n" + table.toString() + "\n");
    inquirer
      .prompt([
        {
          type: "number",
          name: "id",
          message: "Which product would you like to add inventory to?"
        },
        {
          type: "number",
          name: "amount",
          message: "How many would you like to add to the inventory?"
        }
      ])
      .then(function(res) {
        connection.query(
          "SELECT * FROM Products WHERE ?",
          { id: res.id },
          function(err, response) {
            if (err) throw err;
            var addId = response[0].id;
            var newStock = Number(response[0].stock) + Number(res.amount);
            connection.query(
              "UPDATE Products SET ? WHERE ?",
              [{ stock: newStock }, { id: addId }],
              function(err, update) {
                if (err) throw err;
                console.log(update.affectedRows + " stock updated\n");
                startMenu();
              }
            );
          }
        );
      });
  });
}

function addItemPrompt() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Are you sure you would like to add an item?",
        default: true
      }
    ])
    .then(function(con) {
      switch (con.confirm) {
        case true:
          addItem();
          break;
        case false:
          console.log("Going back to start menu.");
          startMenu();
          break;
      }
    });
}

function addItem() {
  connection.query("SELECT DISTINCT department FROM departments", function(
    err,
    res
  ) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "newProd",
          message: "What is the name of the new product?"
        },
        {
          type: "rawlist",
          name: "newDepart",
          message: "Which department is this item in?",
          choices: function() {
            var choiceArry = [];
            for (i = 0; i < res.length; i++) {
              choiceArry.push(res[i].department);
            }
            return choiceArry;
          }
        },
        {
          type: "number",
          name: "newPrice",
          message: "How much are we selling this new product for?"
        },
        {
          type: "number",
          name: "newStock",
          message: "How many of these do we have?"
        }
      ])
      .then(function(answers) {
        console.log(`\nNew Item Details\n-------------------------`);
        console.log(
          `New Item: ${answers.newProd}\nDepartment: ${answers.newDepart}\nPrice: ${answers.newPrice}\nStock: ${answers.newStock}\n-------------------------`
        );
        connection.query(
          `INSERT INTO Products (prodName, department, price, stock, product_sales)VALUES("${
            answers.newProd
          }", "${answers.newDepart}", ${answers.newPrice}, ${
            answers.newStock
          }, ${0})`,
          function(err, response) {
            if (err) throw err;
            console.log(response.affectedRows + " item added\n");
            startMenu();
          }
        );
      });
  });
}
