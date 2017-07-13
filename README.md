# Bamazon
Homework Week 12 - Bamazon


You will also need to run **npm install** to get the right packages from the package.json

## bamazonCustomer.js

- In a gitBash terminal run:  **node bamazonCustomer.js**
	-  After the welcome message, the items for sale will be displayed
	![Example Customer 1](/images/customer1.png)

	-  Users will be prompted to enter the item number and the quantity.  The inventory quantity of the selected item will be decremented 
	by the amount the user specifies and the user will get feedback on thier order status and the total price.  User is then asked if they 
	wish to continue shopping. 
	![Example Customer 2](/images/customer2.png)

	-  If the is insufficient quantity in stock the user will get a message and asked if they wish to continue shopping. 
	![Example Customer 3](/images/customer3.png)

	

## bamazonManager.js

- In a gitBash terminal run:  **node bamazonManager.js**
	-  After the welcom message, the manager will be given a list of actions that can be done.
	   After user completes each action they will return to this menu.
	![Example Manager 1](/images/manager1.png)

	-  View Products for Sale: List all of the items in the products table
	![Example Manager 2](/images/manager2.png)

	-  View Low Inventory:  List all items in the products table where the quantity in stock is less tha 5. 
	![Example Manager 3](/images/manager3.png)

	-  Add to Inventory:  User is propmpted to select an item and an amount to restock.  The quantity in stock is incremented by the 
	   user specified amount.
	![Example Manager 4](/images/manager4.png)

	-  Add New Product:   User will be prompted for product name, department and price. 
	![Example Manager 5](/images/manager5.png)

	-  Exit:
	![Example Manager 6](/images/manager6.png)


## bamazonSupervisor.js

-  In a gitBash terminal run:  **node bamazonSupervisor.js**
	-  After the welcom message, the manager will be given a list of actions that can be done.
	   After user completes each action they will return to this menu.
	![Example Supervisor 1](/images/supervisor1.png)

	-  View Product Sales by Department:  User can view the departments, their costs, their sales, and how much profit they are making:
	![Example Supervisor 2](/images/supervisor2.png)

	-  Create New Department:  User is prompted to enter a department name, and over head costs:
	![Example Supervisor 3](/images/supervisor3.png)