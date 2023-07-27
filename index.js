import express from "express";

import session from "express-session"; // Import the express-session package
// const multer = require('multer');
import authRoute from "./routes/auth_route.js";
import userRouter from "./routes/users.route.js";
import clientRouter from "./routes/clients.route.js";
import establishmentRouter from "./routes/establishment.route.js";
import batimentstRouter from "./routes/batiment.route.js"

import { fileURLToPath } from 'url';
import path from 'path';
import {upload} from './middlewares/multer.middleware.js';
// import session from "express-session";
import Batiment from "./models/batiment-model.js";
import Product from "./models/product-model.js";
import dotenv from 'dotenv';
// import User from "../models/user-model.js";
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE: db, USERNAMESQL: username, PASSWORDSQL: mdp } = process.env;

import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize(db, username, mdp, {
    host: hostname,
    dialect: 'mysql',
  });
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// const Product = require('./product'); // Replace with the actual path to your product.js file

app.get('/', async (req, res) => {
  try {
    // Fetch batiments and products from the database
    const batiments = await Batiment.findAll();
    const products = await Product.findAll();

    // Render the EJS template and pass batiments and products as locals
    res.render('products/showAllProducts', { batiments, products });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
// module.exports = router;

/*
import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize(db, username, mdp, {
    host: hostname,
    dialect: 'mysql',
  });
// Function to test the Product model
async function testProductModel() {
  try {
    // 1. Create a new product
    const newProduct = await Product.create({
      name: 'Sample Product 1',
      capacity: 'Sample Capacity 2',
      price: '100',
      type: 'Salle',
      photo: 'sample.jpg',
      establishment_id: 1, // Replace with the correct establishment ID
      batiment_id: 11, // Replace with the correct batiment ID or keep it as null
    });

    console.log('New product created:', newProduct.toJSON());

    // 2. Find a product by ID
    const productIdToFind = newProduct.id; // Use the ID of the newly created product
    const foundProduct = await Product.findByPk(productIdToFind);

    console.log('Found product:', foundProduct.toJSON());

    // 3. Update a product
    const updatedProduct = await foundProduct.update({
      price: '120', // Change the price
    });

    console.log('Updated product:', updatedProduct.toJSON());

    // 4. Delete a product
    // await updatedProduct.destroy();
    // console.log('Product deleted.');

  } catch (error) {
    console.error('Error testing Product model:', error.message);
  } finally {
    // Close the Sequelize connection after testing
    await sequelize.close();
  }
}

// Call the function to test the Product model
testProductModel();
*/