# PetShop with Ethereum Blockchain

An online petshop with features to adopt and view pets. Uses Truffle for a Ethereum based Blockchain.


Based on the [Pet Shop tutorial](http://truffleframework.com/tutorials/pet-shop).

## Installation

1. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```
	Also Requires [Ganache](http://truffleframework.com/ganache/) to be preinstalled and running for a personal Truffle development blockchain.
    
    
2. Clone the repo.

3. Run the development console in the repo.
    ```javascript
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

5. Run the `liteserver` development server (outside the development console) for front-end hot reloading. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run dev
    ```


## FAQ

* __How do I use this with the EthereumJS TestRPC?__

    It's as easy as modifying the config file! [Check out our documentation on adding network configurations](http://truffleframework.com/docs/advanced/configuration#networks). Depending on the port you're using, you'll also need to update line 16 of `src/js/app.js`.
