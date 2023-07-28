import Batiment from "../models/batiment-model.js";
import Product from "../models/product-model.js";
import Image from "../models/image-model.js";
import Establishment from "../models/establishment-model.js";

export const showTabsSalles = async (req, res) => {
    try {
      // Fetch batiments from the database
      const batiments = await Batiment.findAll({
        attributes: ['id', 'name', 'adresse'], // Include address in the query result
      });
  
      // Fetch products from the database and include associated Batiment and Establishment data
      const products = await Product.findAll({
        where: {
          type: 'Salle',
        },
        include: [
          {
            model: Batiment,
            attributes: ['id', 'name', 'adresse'],
          },
          {
            model: Establishment,
            attributes: ['id', 'name'],
          },
        ],
      });
  
      const firstName = req.session.user.firstName;
      const lastName = req.session.user.lastName;
  
      // Filter batiments to only include those that have associated products of type "Salle"
      const filteredBatiments = batiments.filter((batiment) =>
        products.some((product) => product.batiment_id === batiment.id)
      );
  
      // Render the EJS template and pass filtered batiments and filtered products as locals
      res.render('products/all-salles', { batiments: filteredBatiments, products, firstName, lastName });
    } catch (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };


export const getProfile = async (req, res) => {
    console.log("getProfile starting")
    const firstName = req.session.user.firstName;
    const lastName = req.session.user.lastName;
    const productId = parseInt(req.params.productId, 10); // Extract the product ID from the URL parameter and parse it as an integer.

    try {
        // Find the product with the given ID in the database.
        const salle = await Product.findOne({ 
        where: { id: productId },
        include: [
            {
                model: Batiment,
                attributes: ['id', 'name', 'adresse'],
            },
            {
                model: Establishment,
                attributes: ['id', 'name'],
            },
            ],
        });

        if (!salle) {
        return res.status(404).send('Product not found.'); // Handle the case when the product ID is not found.
        }
        
        const param = salle

        console.log("product has:param ",param)
        console.log("product done ")
        // Render the product profile template with the product data.
        res.render('products/profileProduct', {  firstName, lastName, param });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Error fetching product. Please try again.');
    }
    console.log("getProfile done")
}


