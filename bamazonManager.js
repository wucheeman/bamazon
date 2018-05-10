//GLOBAL VARIABLES
//===============================================================
const mysql = require('mysql');
const inquirer = require('inquirer');
const { table } = require('table');
let productArray = [];

// connect to bamazon
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "mark",
  password: "",
  database: "bamazon"
});


//FUNCTIONS
//=================================================================

const displayOptions = () => {
  console.log('In display options');
  connection.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;
    productArray = result;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          message: 'Please make a choice',
          choices: ['View Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
        }
      ])
      .then(function (answer) {
        switch (answer.choice) {
          case 'View Products':
            viewProducts();
            break;
          case 'View Low Inventory':
            viewLowInventory();
            break;
          case 'Add to Inventory':
            addToInventory();
            break;
          case 'Add New Product':
            addNewProduct();
            break;
          default:
            console.log('displayOptions has a bug');
        }
      }); // end of .then
  }); // end of connection.query
} // end of displayOptions

const viewProducts = () => {
  console.log('in viewProducts');
  // TODO: refactor to use table
  console.log('\n                         OUR PRODUCTS');
  console.log('=============================================================');
  console.log(' ID             PRODUCT NAME                PRICE    QUANTITY')
  console.log('-------------------------------------------------------------');
  for (var i = 0; i < productArray.length; i++) {
    let spacer = computeSpacer(i, productArray.length);
    let padNeeded = computePad(productArray[i].product_name.length);
    let digitSpaceNeeded = computeDigitSpace(productArray[i].price);
    let quantSpaceNeeded = computeDigitSpace(productArray[i].stock_quantity);
    console.log(spacer +
      productArray[i].item_id + " | " +
      productArray[i].product_name + padNeeded + " | " +
      ' $' + digitSpaceNeeded + productArray[i].price + '.00' + " |   " +
      quantSpaceNeeded + productArray[i].stock_quantity + "   |");
  }
  console.log('-------------------------------------------------------------');
  connection.end();
}

// TODO: REMOVE THESE WHEN VIEWPRODUCTS IS REFACTORED

const computeSpacer = (counter, arrayLength) => {
  // TODO: (future) link spacer length to field size
  if (counter < arrayLength - 1) {
    return '  '; // double space; 
  }
  return ' '; // single space;
}

const computeDigitSpace = (quantity) => {
  if (quantity < 10) {
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

// END REMOVE

const viewLowInventory = () => {
  console.log('in viewLowInventory');
  let config = {
    columns: {
      0: {
        alignment: 'center',
      },
      1: {
        alignment: 'center',
      },
      2: {
        alignment: 'center',
      }
    }
  }; 
  let titles = ['ITEM ID ', 'PRODUCT', 'IN STOCK'];
  let data = productArray.filter(function(product) {
    return product.stock_quantity < 5;
  });
  let nameAndQuantity = data.map(function (product) {
    return [product.item_id, product.product_name, product.stock_quantity];
  });
  nameAndQuantity.unshift(titles);
  console.log(table(nameAndQuantity, config)); // add , config to format
  connection.end();
}

const addToInventory = () => {
  console.log('in addToInventory');
  inquirer
  .prompt([
    {
      name: "productID",
      type: "input",
      message: "\nInput the ID of the product ",
      validate: function(value) {
        if (value !== '' && 
            isNaN(value) === false && 
            value <= productArray.length && 
            value > 0) {
          return true;
        }
        return false;
      }
    },
    {
      name: "quantity",
      type: "input",
      message: "How many units?" ,
      validate: function(value) {
        if (value !== '' && 
            isNaN(value) === false &&
            value > -1) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answer) {
    const productID = answer.productID;
    const index = parseInt(answer.productID) - 1;
    const quantity = parseInt(answer.quantity) + productArray[index].stock_quantity;
    //console.log(index, quantity);
    if (quantity === 0) {
      console.log('No update required');
      connection.end();
    } else {
      // NOT DRY with bamazon.js
      // TODO (future) modularize application so only one instance is needed
      updateQuery = `
        UPDATE products
        SET stock_quantity = ${quantity}
        WHERE item_id = ${productID};
      `
      // console.log(updateQuery);
      connection.query(updateQuery, function(err, result) {
        if (err) throw err;
           connection.end();
      }); // end of update query
    } // else of else
  }); // end of .then
} // end of function


const addNewProduct = () => {
  console.log('in addNewProduct');
  // Display prompt for new product_name
  // Display prompt for new department name (given list of departments)
  // Display prompt for new product price
  // Display prompt for new product stock_quantity
  // Formulate query to update DB for new product using INSERT INTO and values from prompts
  // Runs query
  connection.end();
}

// APPLICATION
//==================================================================

connection.connect(function (err) {
  if (err) throw err;
  displayOptions();
}); 