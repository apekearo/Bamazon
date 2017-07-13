CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id integer auto_increment NOT NULL PRIMARY KEY,
product_name  varchar(50) NOT NULL, 
department_name varchar(30) NULL,
price numeric(10,2),
stock_quantity integer,
product_sales integer
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('House', 'Real Estate', 425000.00, 2, 0)
, ('Condo','Real Estate', 275000, 3, 0 )
, ('Sofa', 'Furniture', 799.00, 4, 0)
, ('Recliner','Furniture', 425.99,2, 0)
, ('Dining talble','Furniture',500.00,2, 0)
, ('Chairs','Furniture',125.00, 6, 0)
, ('Oriental Carpet', 'Accessories', 1500.00, 4, 0)
, ('Tiffany Lamp','Accessories', 175.00, 3, 0)
, ('Painting','Accessories', 2500.00, 5, 0)
, ('Washer','Appliances', 599.00, 2, 0)
, ('Dryer','Appliances', 525.00, 3, 0)
, ('Double Oven','Appliances', 2499.00, 2, 0)
, ('Refrigerator','Appliances', 3499.00, 3, 0)
, ('Water Heater','Appliances', 799.00, 2, 0)
, ('Television','Electronics', 650.00, 7, 0)
, ('DVR/DVD','Electronics', 300.50, 4, 0)
, ('Playstation','Electronics', 499.00,3, 0)
, ('Lawnmower','Outdoors', 1500.00,4, 0)
, ('BBQ Grill','Outdoors',810.00, 3, 0);

SELECT * FROM products;

CREATE TABLE departments(
dept_id integer auto_increment NOT NULL PRIMARY KEY,
department_name varchar(30) NULL,
overhead_costs numeric(10,2)
);


INSERT INTO departments (department_name, overhead_costs)
VALUES ('Real Estate', 500000.00)
, ('Furniture', 25000.00)
, ('Accessories', 20000)
, ('Appliances', 15000)
, ('Electronics', 7000)
, ('Outdoors', 6500);


SELECT * FROM departments;