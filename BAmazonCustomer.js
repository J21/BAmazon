//dependencies that i need
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');


//my connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
    user: "root", //Your username
    password: "Jonster21", //Your password
    database: "bamazon_db"
});

function displayTable(){
	connection.query('SELECT * FROM products', function(error, response){
		if(error){ console.log(error)};
		var display = new Table({
			head: ['product_id', 'product_name', 'department_name', 'price', 'stock_quantity'],
			colWidths: [11, 105, 13, 10, 15]
		});
		for (i = 0; i <response.length; i++) {
			display.push(
				[response[i].product_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
				);
		}
		console.log(display.toString());
		inquirePurchase();
	});
}

	function inquirePurchase() {
		inquirer.prompt([
		{
			name: "product_id",
			type: "input",
			message: "What item do you wish to purchase? Please enterID number."

		}, {
			name: 'stock_quantity',
			type: 'input',
			message: "How many would you like to buy?"
		},

		]).then(function(answers) {
			var quantity = answers.stock_quantity;
			var ID = answers.product_id;
			purchaseDatabase(ID, quantity);
		});
	}

	function purchaseDatabase(ID, quantity) {
		connection.query('SELECT * FROM products WHERE product_id = ?', [ID], function(error, response){
			if (error) { console.log(error) };
			if (quantity <= response[0].stock_quantity){
				var total = response[0].price * quantity;
				console.log("We can make your order!");
				console.log("Your total cost for " + quantity + " " + response[0].product_name + " is " + total + ". Thank you for your purchase! We hope to see you again soon!");
				var newQ = response[0].stock_quantity - quantity;
				connection.query('UPDATE products SET stock_quantity = ? WHERE product_id = ?', [newQ, ID]);	
			} else {
				console.log("I'm sorry. We don't have enough " + response[0].product_name + " to complete the order. Our apologies.");
			}
			displayTable();
		});
	}	
	displayTable();