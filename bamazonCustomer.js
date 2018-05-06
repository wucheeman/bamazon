// require for mysql and inquirer
const mysql = require('mysql');
const inquirer = require('inquirer');

// connect to bamazon
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "mark",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  getAllProducts();
  connection.end();
});

// retrieve all products
// TODO: refactor so this can be run from connect?
function getAllProducts() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    console.log(result);
    //connection.end();
  });
}

// display product id, name, and price for each product

// query id to purchase and quantity desired

// check quantity available.

// if quantity insufficient, refuse / else fulfill order, update quantity, and show total price