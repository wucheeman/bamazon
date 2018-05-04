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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
('Decision-Making Paperweight', 'Gifts', 24.00, 18),
('Hitchhiker\'s Guide to the Galaxay', 'Books', 7.00, 6),
('XKCD Linux Commands T-Shirt', 'Clothing', 14.00, 3),
('Oregon Trail Handheld Game', 'Electronics', 18.00, 26),
('Jamstik Wireless Smart Guitar', 'Musical Instruments', 21.00, 2),
('Star Wars Death Star Fire Pit', 'Outdoor Furnishings', 42.00, 1),
('Moving Inkblot Rorschach Mask', 'Clothing', 30.00, 12),
('Smartphone Game Boy Adapter', 'Electronics', 38.00, 4),
('Iron Man Floating Action Figure', 'Gifts', 6.00, 7),
('Star Wars Poster', 'Fine Art', 12.00, 7);

-- SELECT * FROM products


