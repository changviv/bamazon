require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer")


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});


function start() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // console.log(res);
      console.log("--------------------------------------")
      console.log("Item ID, Product Name, Price, Stock")
      console.log("--------------------------------------")
      for (var i = 0; i < res.length; i++){
             console.log(res[i].item_id + " | " + res[i].product_name
              + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      inquirer
        .prompt([
            {
                name: "firstchoice",
                type: "rawlist",
                choices: function() {
                  var choiceArray = [];
                  for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].product_name);
                  }
                  return choiceArray;
                },
                message: "What Item would you like to buy?"
            },
            {
                name: "unitchoice",
                type: "input",
                message: "How many units would you like to buy?",
                validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
                }
            }
        ])
        .then(function(answer) {
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.firstchoice) {
                    chosenItem = res[i];
                }
            };
            updateStock(chosenItem, answer)
        });
    })
};


function updateStock(item, answer) {
  if (parseInt(answer.unitchoice) <= item.stock_quantity ) {
    var new_stock = (item.stock_quantity - parseInt(answer.unitchoice))
    var cost = (parseInt(item.price) * parseInt(answer.unitchoice))
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: new_stock
        },
        {
          item_id: item.item_id
        }
      ],
      function(error) {
        if (error) throw error;
        console.log("Nice! You've purchased " + answer.unitchoice + " " + item.product_name);
        console.log("Your total cost is", cost)
        connection.end();
      }
    )
  } else {
    console.log("Oh no, you got's no more!")
  }
}
