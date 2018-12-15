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
  managerStart();
});

var viewChoices = ["Products for Sale", "Low Invetory", "Add Inventory",
"Add New Products"]


function managerStart() {
    inquirer
      .prompt([
        {
          name: "firstView",
          type: "rawlist",
          choices: viewChoices,
          message: "Hey Manager, what would you like to view?"
        }
      ])
      .then(function(answer) {

        console.log(answer.firstView)

        switch (answer.firstView) {
        	case viewChoices[0]:
        		console.log("Looking at the products for sale")
        		productsForSale();
        		break;
        	case viewChoices[1]:
        		console.log("Looking for low Inventory")
        		lowInventory();
        		break;
        	case viewChoices[2]:
        		console.log("Looking to add Inventory")
        		addInventory();
        		break;
        	case viewChoices[3]:
        		console.log("Adding Products");
        		addProducts();
        }
    });
};

function productsForSale() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) return err;
	console.log("\n")
	console.log("--------------------------------------")
    console.log("Item ID, Product Name, Price, Stock")
    console.log("--------------------------------------")
		for (var i = 0; i < res.length; i++){
		  console.log(res[i].item_id + " | " + res[i].product_name
        + " | " + res[i].price + " | " + res[i].stock_quantity);
		}
	});
}

function lowInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) return err;
	console.log("\n")
	console.log("--------------------------------------")
    console.log("Low Inventory Items")
    console.log("--------------------------------------")
    console.log("Item ID, Product Name, Price, Stock")
    console.log("--------------------------------------")
		for (var i = 0; i < res.length; i++){
			if (res[i].stock_quantity <= 5) {
		       console.log(res[i].item_id + " | " + res[i].product_name
		       	+ " | " + res[i].price + " | " + res[i].stock_quantity);
			}
		}
	});
}

function addInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		inquirer
		  	.prompt([
		  	  	{
		  	    	name: "updateChoices",
		  	    	type: "rawlist",
		  	    	choices: function() {
		  	                var choiceArray = [];
		  	                for (var i = 0; i < res.length; i++) {
		  	                  choiceArray.push(res[i].product_name);
		  	                }
		  	                return choiceArray;
		  	    	},
		  	     	message: "Hey Manager, What item would you like to update?"
		  	  	},
		  	  	{
		  	    	name: "updateStock",
		  	    	type: "input",
		  	    	message: "Hey Manager, How much stock do you want to add?",
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
		  		  	if (res[i].product_name === answer.updateChoices) {
		  		    	chosenItem = res[i];
		  		  	}
		  		};
		  		var totalStock = chosenItem.stock_quantity + parseInt(answer.updateStock)
		  		updateProduct(answer.updateChoices, totalStock)
		  	}
		)
	})
};

function updateProduct(name, quantity) {
  	var query = connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity
          	},
          	{
            	product_name: name
          	}
        ],
        function(err, res) {
        	if (err) throw err;
        	console.log(name + " have a total stock quantity of " + quantity);
        }
    );
}

function addProducts() {
	inquirer
		.prompt([
		    {
		      name: "product_name",
		      type: "input",
		      message: "Hey Manager, What new product would you like to add?"
		    },
		    {
		      name: "department_name",
		      type: "input",
		      message: "Hey Manager, What department is this under?",
		    },
		    {
		      name: "price",
		      type: "input",
		      message: "Hey Manager, how much does this cost?",
		      validate: function(value) {
		      if (isNaN(value) === false) {
		        return true;
		      }
		      return false;
		      }
		    },
		    {
		      name: "stock",
		      type: "input",
		      message: "Hey Manager, how much quantity do you have?",
		      validate: function(value) {
		      if (isNaN(value) === false) {
		        return true;
		      }
		      return false;
		      }
		    },

		])
		.then(function(answer) {
		  	console.log("Inserting a new product...\n");
		  	var query = connection.query(
		  	    "INSERT INTO products SET ?",
		  	    {
		  	      product_name: answer.product_name,
		  	      department_name: answer.department_name,
		  	      price: answer.price,
		  	      stock_quantity: answer.stock
		  	    },
		  	    function(err, res) {
		  	    	if (err) throw err
		  	      	console.log(res.affectedRows + " product inserted!\n");
		  	    }
		  	);
		  	console.log(query.sql);
      	}
    )
}
