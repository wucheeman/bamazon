//GLOBAL VARIABLES
//===============================================================
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


//FUNCTIONS
//=================================================================

const displayOptions = () => {
  console.log('In display options');
  // query DB, retrieve data on all products, assign to productArray
// list a set of menu options for manager and
// prompt user for choice. Based on input, 
// call viewProducts
// call viewLowInventory
// call addToInventory
// call addNewProduct
inquirer
  .prompt([
    {
      name: "choice",
      type: "list",
      message: 'Please make a choice',
      choices: ['View Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
    }
  ])
  .then(function(answer) {
      switch(answer.choice) {
        case 'View Products':
          viewProducts();
          break;
        case 'View Low Inventory':
          viewLowInventory();
          break;
        case 'Add to Inventory':
          addToInventory();
          break;
        case 'Add New Product' :
          addNewProduct();
          break;
        default :
          console.log('displayOptions has a bug');
      }
    // TODO: remove this
    // connection.end();
  }); // end of .then
} // end of displayOptions

const viewProducts = () => {
  console.log('in viewProducts');
  // Using productArray, lists every available item: the item IDs, names, prices, and quantities.
  connection.end();
}

const viewLowInventory = () => {
  console.log('in viewLowInventory'); 
  // Using productArray, lists all items with an inventory count lower than five.
  connection.end();
}

const addToInventory = () => {
  console.log('in addToInventory');
// Display prompt to "add more" of any item or none
// Formulate query to update stock quantity for selected item using UPDATE... SET ... WHERE.
// Runs query
  connection.end();
}


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

connection.connect(function(err) {
  if (err) throw err;
  displayOptions();
}); 