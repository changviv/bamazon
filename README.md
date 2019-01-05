### Challenge #1: Customer View (Minimum Requirement)

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.


7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

  <img width="545" alt="screen shot 2019-01-05 at 1 40 15 pm" src="https://user-images.githubusercontent.com/20783131/50729519-35a96480-10f0-11e9-9495-2120ef7860b4.png">

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
   
   <img width="587" alt="screen shot 2019-01-05 at 1 39 53 pm" src="https://user-images.githubusercontent.com/20783131/50729543-a2bcfa00-10f0-11e9-82c7-8d5fb849cc68.png">

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.
   
   In this screenshot below - the VHS has been updated by (-5 items)
   
   <img width="485" alt="screen shot 2019-01-05 at 1 40 48 pm" src="https://user-images.githubusercontent.com/20783131/50729564-1101bc80-10f1-11e9-8689-2c3658a19699.png">


- - -

* If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.


### Challenge #2: Manager View (Next Level)

* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale

    * View Low Inventory

    * Add to Inventory

    * Add New Product


  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
  
  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
  
  
  Screenshot below shows both Low inventory and to Add new Inventory
   <img width="529" alt="screen shot 2019-01-05 at 1 42 11 pm" src="https://user-images.githubusercontent.com/20783131/50729587-6342dd80-10f1-11e9-9a5a-46c8d5fdab4b.png">

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
  
  <img width="630" alt="screen shot 2019-01-05 at 1 42 55 pm" src="https://user-images.githubusercontent.com/20783131/50729608-bfa5fd00-10f1-11e9-8177-49f68ae654ad.png">
  
    * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
  
  <img width="576" alt="screen shot 2019-01-05 at 1 43 32 pm" src="https://user-images.githubusercontent.com/20783131/50729609-caf92880-10f1-11e9-93b6-72299a674ef8.png">


