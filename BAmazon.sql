DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  product_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(30) NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER(200) NOT NULL,
  PRIMARY KEY (product_id)
);

/*syntax for creating new product*/
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES('Chocolate Chip Cookies','Food',1.99,200);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES('Apple Pies','Food',3.99,100);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES('Tea','Drink',1.99,250);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES('Lemonade','Drink',1.50,300);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES('Coffee','Drink',2.50,150);

