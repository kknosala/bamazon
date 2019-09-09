DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INT NOT NULL auto_increment,
    prodName varchar(50),
    department varchar(50),
    price DECIMAL(10,2),
    stock INT(10),
    product_sales DECIMAL(10,2),
    PRIMARY KEY (id)
);

INSERT INTO products (prodName, department, price, stock, product_sales)
values("Toilet Paper", "Bathroom", 5.25, 200, 0);

INSERT INTO products (prodName, department, price, stock, product_sales)
values("Camping Tent", "Outdoors", 259.95, 50, 0);

INSERT INTO products (prodName, department, price, stock, product_sales)
values("Laptop", "Electronics", 599.95, 25, 0);

INSERT INTO products (prodName, department, price, stock, product_sales)
values("40' TV", "Electronics", 2499.95, 35, 0);

INSERT INTO products (prodName, department, price, stock, product_sales)
values("Bindel", "Electronics", 124.95, 75, 0);

INSERT INTO products (prodName, department, price, stock, product_sales)
values("Tooth Brush", "Bathroom", 2.50, 300, 0);

INSERT INTO products (prodName, department, price, stock, product_sales)
values("Dinning Chair", "Dinning", 75.25, 60, 0);

INSERT INTO products (prodName, department, price, stock, product_sales)
values("Wine Glass Set", "Dinning", 49.99, 100, 0);

INSERT INTO products (prodName, department, price, stock, product_sales)
values("Portable Grill", "Outdoors", 79.95, 20, 0);

INSERT INTO products (prodName, department, price, stock, product_sales)
values("Text Book", "Books", 354.95, 15, 0);

CREATE TABLE departments (
	department_id INT NOT NULL auto_increment,
    department varchar(50),
    over_head_costs DECIMAL(10,2),
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department, over_head_costs)
values('Bathroom', 1000);

INSERT INTO departments (department, over_head_costs)
values('Electronics', 5000);

INSERT INTO departments (department, over_head_costs)
values('Outdoors', 1250);

INSERT INTO departments (department, over_head_costs)
values('Dinning', 3500);

INSERT INTO departments (department, over_head_costs)
values('Books', 1300);

SELECT * FROM products;
SELECT * FROM departments;