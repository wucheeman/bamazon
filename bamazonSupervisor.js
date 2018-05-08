// SQL for new departments table with 3 columns:
// - department_id
// - department_name
// - over_head_costs


// Updated SQL for products table to add product sales column

// GLOBAL VARIABLES
// =====================================================================

// require inquirer and mysql

// create connection using mysql

// productArray 

// FUNCTIONS
// =====================================================================
// function addDepartment
// prompt user for inputs to department table
// create query using inputs and INSERT INTO
// run query
// end connection

// function computeTotalProfit(over_head_costs,  product_sales)
// returns (product_sales - over_head_costs)

// function computeDepartmentSales
// sums sales of products belonging to each department and updates ProductArray

// function displayOptions
// Displays options and prompts user to pick one
// - View Product Sales by Department
// - Add New Department
// call viewProductsales or addDepartment

// function viewProductsales
// retrieves data in productTable and assigns to productArray
// calls 
// displays this table
// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |
// end connection


// APPLICATION
// =====================================================================

// connect to DB and call displayOptions