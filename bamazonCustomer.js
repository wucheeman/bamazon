// GLOBAL VARIABLES
// =======================================================================
const mysql = require('mysql');
const inquirer = require('inquirer');
let productArray = [];

// FUNCTIONS
// ========================================================================

const computeSpacer = (counter, arrayLength) => {
  if (counter < arrayLength - 1) {
    return '  '; // double space; TODO: (future) link spacer length to field size
  }
  return ' '; // single space;
}

const computeDigitSpace = (price) => {
  if (price < 10) {
    return ' ';
  }
  return ''; // empty string
}

const computePad = (stringLength) => {
  let stringifiedPad = [];
  let padNeeded = 35 - stringLength; // TODO: (future) link pad length to field size
  for (let i = 0; i < padNeeded; i++) {
      stringifiedPad.push(' ');
    }
  return finalFormPad = stringifiedPad.toString().replace(/,/g, '');
}

const purchaseProduct = (numProducts) => {
  inquirer
  .prompt([
    {
      name: "productID",
      type: "input",
      message: "Input the ID of our fine product that you want ",
      validate: function(value) {
        if (isNaN(value) === false && value < numProducts) {
          return true;
        }
        return false;
      }
    },
    {
      name: "quantity",
      type: "input",
      message: "How many ?" ,
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answer) {
     console.log(`You want to buy ${answer.quantity} unit(s) of ${answer.productID}`);
     const index = answer.productID - 1;
     const quantity = parseInt(answer.quantity);
     if (quantity > productArray[index].stock_quantity) {
      console.log(`Sorry, we don't have enough`);
     } else {
       // TODO compute price, etc
       const total = quantity * productArray[index].price;
       console.log(`Sold for $ ${total}.00!`);
     }
  }); // end of .then
}

// retrieve all products
// TODO: refactor so this can be run from connect?
function getAllProducts() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    // console.log(result);
    console.log('\n                OUR PRODUCTS');
    console.log('===================================================');
    console.log(' ID             PRODUCT NAME                PRICE')
    console.log('---------------------------------------------------');
    productArray = result;
    // TODO make these references to productArray
    for (var i = 0; i < result.length; i++) {
      let spacer = computeSpacer(i, result.length);
      let padNeeded = computePad(result[i].product_name.length);
      let digitSpaceNeeded = computeDigitSpace(result[i].price);
      console.log(spacer + 
                  result[i].item_id + " | " + 
                  result[i].product_name + padNeeded + " | " + 
                  ' $' + digitSpaceNeeded + result[i].price + '.00');
    }
    console.log('---------------------------------------------------');

    // query id to purchase and quantity desired
    purchaseProduct(productArray.length);
  });

}
// APPLICATION
// ==================================================================

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
  // console.log("connected as id " + connection.threadId);
  // display product id, name, and price for each product
  getAllProducts();

  // check quantity available.

  // if quantity insufficient, refuse / else fulfill order, update quantity, and show total price
  connection.end();
});






