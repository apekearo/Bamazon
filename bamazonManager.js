//************************************************//
//*****       set required npm modules       *****//
//************************************************//
//
//-- file system  --//
	var fs = require("fs");

//-- inquirer  --//
	var inquirer = require("inquirer");

//-- mysql  --//
	var mysql = require("mysql");

	var keys = require("./keys.js");

	var connection = mysql.createConnection(keys.connection);

	connection.connect(function(err) {
    if (err) throw err;
		});

//--  table and formatting  --//
	var cliTable = require("cli-table");

	var colors = require("colors");

//************************************************//
//*****    declare global variables          *****//
//************************************************//
//

	var welcome = "    **********************************************************************\n" +
				  "    **********                BAMAZON MANAGER                   **********\n" +
				  "    **********          Manage product inventories              **********\n" +
				  "    **********                                                  **********\n" +
				  "    **********************************************************************\n\r"

	var inventoryMsg;

	var goodbye = "    **********************************************************************\n" +
				  "    **********           EXTING BAMAZON MANAGER                 **********\n" +
				  "    **********           Keep up the good work !                **********\n" +
				  "    **********                                                  **********\n" +
				  "    **********************************************************************\n\r"



//************************************************//
//*****           global functions           *****//
//************************************************//
//
//----  Main menu with user input  ----//
	function managerMenu(){

		inquirer.prompt([
		 	{
			    type: "list",
			    message: "What do you want to do?",
			    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Products", "Exit"],
			    name: "mgrDoItem"
		  	}
	  	])
		.then(function(manager_menu) {
			switch(manager_menu.mgrDoItem){
				case "View Products for Sale":
					displayProducts();
					break;
				case "View Low Inventory":
					lowInventory();
					break;
				case "Add to Inventory":
					addInventory();
					break;
				case "Add New Products":
					addProduct();
					break;
				case "Exit":
					exitBamazonMgr();
					break;
			};
		});
	};

//----  Display table of inventory items  ----//
	function displayProducts() {

		connection.query("SELECT * FROM products", function(err, res) {
		    if (err) throw err;

		    //console.log(" Reached first function")
			var table = new cliTable({
				head: ["Item Number".cyan, "Product Name".cyan, "Department".cyan, "Price".cyan, "Quantity".cyan],
				colWidths: [13, 20, 20, 13, 13],
				});
			
			for(var i = 0; i < res.length; i++) {
				table.push(
				    [res[i].item_id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2), res[i].stock_quantity]
				);
			};
			
			console.log(table.toString());	
			managerMenu();
		});
	};


//----  See inventory with low qty of instock items  ----//
	function lowInventory(){
		connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
		    if (err) throw err;

		    //console.log(" Reached first function")
			var table = new cliTable({
				head: ["Item Number".cyan, "Product Name".cyan, "Department".cyan, "Price".cyan, "Quantity".cyan],
				colWidths: [13, 20, 20, 13, 13],
				});
			
			for(var i = 0; i < res.length; i++) {
				table.push(
				    [res[i].item_id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2), res[i].stock_quantity]
				);
			};
			
			console.log(table.toString());	
			managerMenu();
		});

	};

//----  Reorder inventory items  ----//
	function addInventory(){

		connection.query("SELECT * FROM products", function(err, res) {
		    if (err) throw err;

		    //console.log(" Reached first function")
			var table = new cliTable({
				head: ["Item Number".cyan, "Product Name".cyan, "Department".cyan, "Price".cyan, "Quantity".cyan],
				colWidths: [13, 20, 20, 13, 13],
				});
			
			for(var i = 0; i < res.length; i++) {
				table.push(
				    [res[i].item_id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2), res[i].stock_quantity]
				);
			};
			
			console.log(table.toString());	
			

			inquirer.prompt([
				{
					type: "input",
					message: "Which item would you like to reorder? (Iten Number) ",
					name: "itemNum"
				},
				{
					type: "input",
					message: "How many would you like to add to stock?",
					name: "Qty"
				}
			])
			.then(function (userOrder) {

				var i = userOrder.itemNum - 1; 

				var updateQty = parseInt(res[i].stock_quantity) + parseInt(userOrder.Qty);

			//-- Update the product table stock quantity  --//
				connection.query("UPDATE products SET ? WHERE ?", 
	    			[ {
	    				stock_quantity: updateQty
	    			  }, 
	    			  {
	    				item_id: userOrder.itemNum
	    			  }], 
	    			function(error, results) {
						
						if(error) throw error;

						inventoryMsg = "     Your restock order for " + userOrder.Qty + "  " +  res[i].product_name + " has been placed.  \n" ;
								  
			    		console.log(inventoryMsg);
			    		managerMenu();
					}
				);

			});

		});

	};

//----  Add a new inventory item  ----//
	function addProduct(){
		//console.log("still working on this")
		inquirer.prompt([
				{
					type: "input",
					message: "What is the name of the product you would like to add? ",
					name: "itemName"
				},
				{
					type: "list",
					message: "Which department will this item be under ?",
					choices: ["Real Estate" , "Furniture" , "Accessories", "Appliances", "Electronics", "Outdoors", "Windows_Doors"],
					name: "itemDept"
				},
				{
					type: "input",
					message: "At what price will this be offered?",
					name: "itemPrice"
				},
				{
					type: "input",
					message: "How many will initially be stocked?",
					name: "itemQty"
				},
			])
		.then(function (addProd) {
			connection.query("INSERT INTO products SET ?", 
				{
					product_name: addProd.itemName,
					department_name: addProd.itemDept,
					price: addProd.itemPrice,
					stock_quantity: addProd.itemQty
				}, 
				function(err, res) {
					if(err) throw err;

					inventoryMsg = "    A quantity of " + addProd.itemQty + " " + addProd.itemName + "s have been added to inventory stock under the " +
						addProd.itemDept + " department";
					console.log(inventoryMsg);
					managerMenu();
				}
			);
		});
	};

//----  Exit the program  ----//
	function exitBamazonMgr(){
		connection.end();
		console.log(goodbye);
	};




//************************************************//
//*****          Start the program           *****//
//************************************************//
//
	console.log(welcome);
	managerMenu();