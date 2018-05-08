// GLOBAL VARIABLES
// =======================================================================
const mysql = require('mysql');
const inquirer = require('inquirer');
let productArray = [];

// connect to bamazon
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "mark",
  password: "",
  database: "bamazon"
});

// FUNCTIONS
// ========================================================================

const computeSpacer = (counter, arrayLength) => {
  // TODO: (future) link spacer length to field size
  if (counter < arrayLength - 1) {
    return '  '; // double space; 
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
  // TODO: (future) link pad length to field size
  let stringifiedPad = [];
  let padNeeded = 35 - stringLength; 
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
      message: "Input the ID of the fine product that you desire ",
      validate: function(value) {
        if (value !== '' && isNaN(value) === false && value <= numProducts) {
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
        if (value !== '' && isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answer) {
    // TODO delete
     console.log(`You want to buy ${answer.quantity} unit(s) of ${answer.productID}`);
     const index = answer.productID - 1;
     const quantity = parseInt(answer.quantity);
     if (quantity > productArray[index].stock_quantity) {
        console.log(`\nSorry, we don't have enough`);
        connection.end();
     } else {
        const total = quantity * productArray[index].price;
        const newStockQuantity = productArray[index].stock_quantity - quantity;
        console.log(`\nSold for $ ${total}.00!`);
        updateDB(newStockQuantity, answer.productID);
     }
  }); // end of .then
}

const showAllProducts = () => {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    console.log('\n                OUR PRODUCTS');
    console.log('===================================================');
    console.log(' ID             PRODUCT NAME                PRICE')
    console.log('---------------------------------------------------');
    productArray = result;
    for (var i = 0; i < productArray.length; i++) {
      let spacer = computeSpacer(i, productArray.length);
      let padNeeded = computePad(productArray[i].product_name.length);
      let digitSpaceNeeded = computeDigitSpace(productArray[i].price);
      console.log(spacer + 
                  productArray[i].item_id + " | " + 
                  productArray[i].product_name + padNeeded + " | " + 
                  ' $' + digitSpaceNeeded + productArray[i].price + '.00');
    }
    console.log('---------------------------------------------------');
    purchaseProduct(productArray.length);
  });
}

const updateDB = (newStockQuantity, productID) => {
  const updateQuery = `
  UPDATE products
  SET stock_quantity = ${newStockQuantity}
  WHERE item_id = ${productID};` ;
  connection.query(updateQuery, function(err, result) {
    if (err) throw err;

    // TODO: delete
    console.log(`Updated!`);
    connection.end();
  });
}


// APPLICATION
// ==================================================================



connection.connect(function(err) {
  if (err) throw err;
  showAllProducts();
});






