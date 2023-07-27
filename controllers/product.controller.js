import Batiment from "../models/batiment-model.js";
import Product from "../models/product-model.js";
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
  