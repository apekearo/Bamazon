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

	var keys = require('./keys.js');

	var connection = mysql.createConnection(keys.connection);

	connection.connect(function(err) {
    if (err) throw err;
		});

//--  table and formatting  --//
	var cliTable = require('cli-table');

	var colors = require('colors');
//************************************************//
//*****    declare global variables          *****//
//************************************************//
//

	var welcome = "    **********************************************************************\n" +
				  "    **********                BAMAZON SUPERVISOR                **********\n" +
				  "    **********                Manage departments                **********\n" +
				  "    **********                                                  **********\n" +
				  "    **********************************************************************\n\r"

	var departmentMsg;

	var goodbye = "    **********************************************************************\n" +
				  "    **********           EXTING BAMAZON SUPERVISOR              **********\n" +
				  "    **********           Making money every day!                **********\n" +
				  "    **********                                                  **********\n" +
				  "    **********************************************************************\n\r"



//************************************************//
//*****           global functions           *****//
//************************************************//
//
//----  Main menu with user input  ----//
	function supervisorMenu(){

		inquirer.prompt([
		 	{
			    type: "list",
			    message: "What do you want to do?",
			    choices: ["View Products Sales by Department", "Create New Department", "Exit"],
			    name: "superDoItem"
		  	}
	  	])
		.then(function(supervisor_menu) {
			switch(supervisor_menu.superDoItem){
				case "View Products Sales by Department":
					displayDepartments();
					break;
				case "Create New Department":
					addDepartment();
					break;
				case "Exit":
					exitBamazonMgr();
					break;
			};
		});
	};

//----  Display table of inventory items  ----//
	function displayDepartments() {

		connection.query("SELECT * FROM departments", function(err, res) {
		    if (err) throw err;

		    //console.log(" Reached first function")
			var table = new cliTable({
				head: ["Dept Number".cyan, "Department Name".cyan, "Overhead Costs".cyan, "Total Sales".cyan, "Profit".cyan],
				colWidths: [20, 20, 20, 20, 20],
				});
			
			for(var i = 0; i < res.length; i++) {
				var profit = res[i].total_sales - res[i].overhead_costs
				table.push(
				    [res[i].dept_id, res[i].department_name, res[i].overhead_costs, res[i].total_sales, profit]
				);
			};
			
			console.log(table.toString());	
			supervisorMenu();
		});
	};


//----  Add a new inventory item  ----//
	function addDepartment(){
		//console.log("still working on this")
		inquirer.prompt([
				{
					type: "input",
					message: "What is the name of the department you would like to add? ",
					name: "itemDept"
				},
				{
					type: "input",
					message: "What is the overhead cost for this department?",
					name: "itemCost"
				}
			])
		.then(function (addDept) {
			connection.query("INSERT INTO departments SET ?", 
				{
					department_name: addDept.itemDept,
					overhead_costs: addDept.itemCost,
					total_sales: 0
				}, 
				function(err, res) {
					if(err) throw err;

					departmentMsg = "    " + addDept.itemDept + " department has been added with an overhead cost of " + addDept.itemCost ;
					console.log(departmentMsg);
					supervisorMenu();
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
	supervisorMenu();