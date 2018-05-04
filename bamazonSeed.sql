DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT(10) AUTO_INCREMENT NOT NULL, 
	product_name VARCHAR(50),
	department_name VARCHAR(30),
	price DECIMAL(7,2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (item_id)
);


