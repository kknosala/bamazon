# Bamazon
Bamazon is an Amazon-like storefront created to demonstrait my skills with MYSQL. The app has a number of different features depending on which user is accessing it.

## Requirements
  The Bamazon app requires the following to work:
   - MYSQL
      - MYSQL Workbench was used to create and test the servers.
   - inquirer
   - cli-table
   - node.js

## Apps
  Bamazaon uses three separte js files to simulate three different user types. The files and the actions that can be done on them are as follows.

  ### bamazonCustomer.js
   This app simulates the customer experience.
  #### Start Menu
    Once logging in, the customer will have the following options:
      ```
      See Product Selection
      - This will show customers available inventory
      Quit
      - This will close the connection and end the program
      ```
   #### Product Selection Page
   Here, cusomters will be able to see product ids, product names, departments, price, and available stock.
   
     They will have the following options available:
     ```
     Buy a Product
     - This will allow the customer to buy a product of their choice
     Go Back Home
     - This will take the customer back to the Start Menu
     Quit
     - This will close the connection and end the program
     ```
