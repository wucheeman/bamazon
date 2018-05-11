//GLOBAL VARIABLES
//===============================================================
const mysql = require('mysql');
const inquirer = require('inquirer');
const { table , getBorderCharacters } = require('table');
let productArray = [];

// import {
//   table,
//   getBorderCharacters
// } from table;

// connect to bamazon
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'mark',
  password: '',
  database: 'bamazon'
});


//FUNCTIONS
//=================================================================

const displayOptions = () => {
  console.log('In display options');
  connection.query('SELECT * FROM products', function (err, result) {
    if (err) throw err;
    productArray = result;
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'list',
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
}; // end of displayOptions

const viewProducts = () => {
  console.log('in viewProducts');
  let config = {
    border: getBorderCharacters(`void`),
    columns: {
      0: {
        width: 10,
        alignment: 'center',
      },
      1: {
        width: 35,
        alignment: 'left',
      },
      2: {
        width: 10,
        alignment: 'right',
      },
      3: {
        width: 10,
        alignment: 'right',
      }
    }
  };
  let titles = ['ITEM ID ', 'PRODUCT', 'PRICE', 'QUANTITY'];
  let productView = productArray.map(function (product) {
    return [product.item_id, product.product_name, product.price, product.stock_quantity];
  });
  productView.unshift(titles);
  console.log(table(productView, config));
  connection.end();
};

const viewLowInventory = () => {
  console.log('in viewLowInventory');
  let config = {
    border: getBorderCharacters(`void`),
    columns: {
      0: {
        width: 10,
        alignment: 'center',
      },
      1: {
        width: 35,
        alignment: 'left',
      },
      2: {
        width: 10,
        alignment: 'right',
      }
    }
  };
  let titles = ['ITEM ID ', 'PRODUCT', 'IN STOCK'];
  let data = productArray.filter(function (product) {
    return product.stock_quantity < 5;
  });
  let nameAndQuantity = data.map(function (product) {
    return [product.item_id, product.product_name, product.stock_quantity];
  });
  nameAndQuantity.unshift(titles);
  console.log(table(nameAndQuantity, config)); // add , config to format
  connection.end();
};

const addToInventory = () => {
  console.log('in addToInventory');
  inquirer
    .prompt([
      {
        name: 'productID',
        type: 'input',
        message: '\nInput the ID of the product ',
        validate: function (value) {
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
        name: 'quantity',
        type: 'input',
        message: 'How many units?',
        validate: function (value) {
          if (value !== '' &&
            isNaN(value) === false &&
            value > -1) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
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
        const updateQuery = `
          UPDATE products
          SET stock_quantity = ${quantity}
          WHERE item_id = ${productID};
        `;
        // console.log(updateQuery);
        connection.query(updateQuery, function (err, result) {
          if (err) throw err;
          connection.end();
        }); // end of update query
      } // else of else
    }); // end of .then
}; // end of function


const addNewProduct = () => {
  console.log('in addNewProduct');
  inquirer
    .prompt([
      {
        name: 'product_name',
        type: 'input',
        message: '\nName of the new product ',
        validate: function (value) {
          if (value !== '') {
            return true;
          }
          return false;
        }
      },
      {
        name: 'department_name',
        type: 'list',
        message: '\nWhat department will sell it ',
        choices: ['Gifts', 'Books', 'Clothing', 'Electronics', 'Musical Instruments', 'Outdoor Furnishings', 'Fine Art'],
        validate: function (value) {
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
        name: 'price',
        type: 'input',
        message: '\nWhat should its price be ',
        validate: function (value) {
          if (value !== '' &&
            isNaN(value) === false &&
            value > 0) {
            return true;
          }
          return false;
        }
      },
      {
        name: 'quantity',
        type: 'input',
        message: '\nHow many units?',
        validate: function (value) {
          if (value !== '' &&
            isNaN(value) === false &&
            value > 0) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      let product_name = answer.product_name;
      // console.log(typeof product_name);
      let price = parseFloat(answer.price)
      let stock_quantity = parseInt(answer.quantity);
      const newProdQuery = `
        INSERT INTO products (product_name, department_name, price, stock_quantity)
        VALUES('${product_name}', '${answer.department_name}', ${price}, ${stock_quantity});
      `;
      // console.log(newProdQuery);
      connection.query(newProdQuery, function (err, result) {
        if (err) throw err;
        connection.end();
      }); // end of new product query
    }); // end of .then
}; // end of function

// APPLICATION
//==================================================================

connection.connect(function (err) {
  if (err) throw err;
  displayOptions();
}); 