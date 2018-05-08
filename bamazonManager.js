//GLOBAL VARIABLES
//===============================================================

//require mysql and inquirer

// declare productArray 


//FUNCTIONS
//=================================================================

// displayOptions()
// query DB, retrieve data on all products, assign to productArray
// list a set of menu options for manager and
// prompt user for choice. Based on input, 
// call viewProducts
// call viewLowInventory
// call addToInventory
// call addNewProduct

// viewProducts()
// Using productArray, lists every available item: the item IDs, names, prices, and quantities.
// close connection

// viewLowInventory
// Using productArray, lists all items with an inventory count lower than five.
// close connection

//addToInventory
// Call viewProducts
// Display prompt to "add more" of any item or none
// Formulate query to update stock quantity for selected item using UPDATE... SET ... WHERE.
// Runs query
// close connection

// addNewProduct
// Display prompt for new product_name
// Display prompt for new department name (given list of departments)
// Display prompt for new product price
// Display prompt for new product stock_quantity
// Formulate query to update DB for new product using INSERT INTO and values from prompts
// Runs query
// close connection



// APPLICATION
//==================================================================

// connect to bamazon and call displayOptions()