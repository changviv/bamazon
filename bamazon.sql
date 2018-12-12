DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Books", "Books", 10, 100),
("Echo", "Amazon", 55, 400),
("Tacos", "Food", 3, 3000),
("DVDs", "Movies", 4, 50),
("VHS", "Movies", 1, 10),
("Super Smash", "Games", 14, 1000),
("Nintendo Switch", "Game Console", 100, 400),
("PS4", "Game Console", 120, 300),
("Xbox", "Game Console", 50, 500),
("Zelda", "Games", 10, 5);
