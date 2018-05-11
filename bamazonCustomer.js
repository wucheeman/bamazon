// GLOBAL VARIABLES
// =======================================================================
const mysql = require('mysql');
const inquirer = require('inquirer');
const { table, getBorderCharacters } = require('table');
let productArray = [];

// connect to bamazon
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'mark',
  password: '',
  database: 'bamazon'
});

// FUNCTIONS
// ========================================================================

const purchaseProduct = (numProducts) => {
  inquirer
    .prompt([
      {
        name: 'productID',
        type: 'input',
        message: 'Input the ID of the fine product that you desire ',
        validate: function (value) {
          if (value !== '' &&
            isNaN(value) === false &&
            value <= numProducts &&
            value > 0) {
            return true;
          }
          return false;
        }
      },
      {
        name: 'quantity',
        type: 'input',
        message: 'How many ?',
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
      const index = parseInt(answer.productID) - 1;
      const quantity = parseInt(answer.quantity);
      if (quantity === 0) {
        console.log(`Sorry you don't want to buy anything. Goodbye!`);
        connection.end();
      } else if (quantity > productArray[index].stock_quantity) {
        console.log(`\nSorry, we don't have enough`);
        connection.end();
      } else {
        const total = quantity * productArray[index].price;
        const newStockQuantity = productArray[index].stock_quantity - quantity;
        console.log(`\nSold for $ ${total}.00!`);
        updateDB(newStockQuantity, answer.productID);
      }
    }); // end of .then
};

const showAllProducts = () => {
  connection.query('SELECT * FROM products', function (err, result) {
    if (err) throw err;
    console.log('\nWelcome to Bamzon! Here is our product catalog:\n')
    productArray = result;
    let config = {
      border: getBorderCharacters('void'),
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
      }
    };
    let titles = ['ITEM ID', 'PRODUCT', 'PRICE'];
    let productView = productArray.map(function (product) {
      return [product.item_id, product.product_name, product.price];
    });
    productView.unshift(titles);
    console.log(table(productView, config));
    purchaseProduct(productArray.length);
  });
}

const updateDB = (newStockQuantity, productID) => {
  const updateQuery = `
  UPDATE products
  SET stock_quantity = ${newStockQuantity}
  WHERE item_id = ${productID};`;
  connection.query(updateQuery, function (err, result) {
    if (err) throw err;
    connection.end();
  });
}


// APPLICATION
// ==================================================================

connection.connect(function (err) {
  if (err) throw err;
  showAllProducts();
});






