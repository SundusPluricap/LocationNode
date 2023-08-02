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

    const user = req.session.user

    // Filter batiments to only include those that have associated products of type "Salle"
    const filteredBatiments = batiments.filter((batiment) =>
      products.some((product) => product.batiment_id === batiment.id)
    );

    // Render the EJS template and pass filtered batiments and filtered products as locals
    res.render('products/all-salles', { batiments: filteredBatiments, products, user });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error');
  }
};


// import multer from 'multer';

// // Set up multer to handle file uploads
// const upload = multer({ dest: 'uploads/' }); // Change 'uploads/' to the appropriate directory path for storing the images

// ...

// Controller function for rendering the createSalle view
export const create = async (req, res) => {
  // Check if there's an error message in the session
  const errorMessage = req.session.errorMessage;
  const batiments = await Batiment.findAll({ attributes: ['id', 'name'] });

  // Clear the error message from the session
  delete req.session.errorMessage;

  res.render('products/createSalle', {  batiments, errorMessage });
};

export const createSalle = async (req, res) => {
  console.log("createSalle starting")
  try {
    const user = req.session.user

    console.log("req.body//////////////////////", req.body)
    const { name, capacity, price, batimentId } = req.body;
    const photo = req.file ? req.file.filename : null;

    const type = 'Salle';
    const newSalle = await Product.create({
      name,
      capacity,
      price,
      type,
      batiment_id : batimentId
    });

    const image = await Image.create({
      name: photo,
      type : "Product",
      product_id: newSalle.id, // Set the product_id to the newly created "Salle" (Product) id
      description: null, // You can add a description if needed
    });


    console.log('New Salle created:', newSalle.toJSON());

    const batiments = await Batiment.findAll({
      attributes: ['id', 'name', 'adresse'], // Include address in the query result
    });

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

  
    // Filter batiments to only include those that have associated products of type "Salle"
    const filteredBatiments = batiments.filter((batiment) =>
      products.some((product) => product.batiment_id === batiment.id)
    );

    // Render the EJS template and pass filtered batiments and filtered products as locals
    res.render('products/all-salles', { batiments: filteredBatiments, products, user });      
  } catch (error) {
    console.error('Error creating batiment:', error);
    res.status(500).send('Error creating batiment. Please try again.');
  }
  console.log("createSalle done")
};

export const getProfile = async (req, res) => {
  console.log("getProfile starting");
  // const firstName = req.session.user.firstName;
  // const lastName = req.session.user.lastName;
  // const idUser = req.session.user.id;
  const user = req.session.user
  const productId = parseInt(req.params.productId, 10); // Extract the product ID from the URL parameter and parse it as an integer.

  try {
    // Find the product with the given ID in the database.
    const product = await Product.findOne({ 
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

    if (!product) {
      return res.status(404).send('Product not found.'); // Handle the case when the product ID is not found.
    }

    // Fetch all the images associated with the product from the 'images' table.
    const productImages = await Image.findAll({
      where: {
        product_id: productId,
      },
    });

    const param = {
      product: product,
      images: productImages,
    };

    console.log("product has:param ", param);
    console.log("product done ");
    // Render the product profile template with the product data and images.
    res.render('products/profileProduct', { user, param});
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Error fetching product. Please try again.');
  }
  console.log("getProfile done");
};


export const deleteSalle = async (req, res) => {
//   console.log("here/////////////////////////////////////////////////////////////////////////////////////////////////////// req.params: ", req.params)
  const productId = parseInt(req.params.productId, 10);
  
  try {
    const salle = await Product.findByPk(productId);

    if (!salle) {
      return res.status(404).send('salle not found.');
    }

    // Delete the user from the database
    await salle.destroy();

    // Redirect to the list of all users or another page after successful deletion
    res.redirect('/products'); // Adjust the URL to redirect to the appropriate page after deletion
  } catch (error) {
    console.error('Error deleting salle:', error);
    res.status(500).send('Error deleting salle.');
  }
};

export const getEdit = async (req, res) => {
  // const firstName = req.session.user.firstName;
  // const lastName = req.session.user.lastName;
  // const idUser = req.session.user.id;
  const user = req.session.user
  const productId = parseInt(req.params.productId, 10);
  const batiments = await Batiment.findAll({ attributes: ['id', 'name'] });

  try {
    // Find the batiment with the given ID in the database.
    const salle = await Product.findOne({ where: { id: productId } });

    if (!salle) {
      return res.status(404).send('Batiment not found.'); // Handle the case when the batiment ID is not found.
    }
    const param = salle
    // Render the batiment profile template with the batiment data.
    res.render('products/editProfile', {batiments, param, user });
  } catch (error) {
    console.error('Error fetching prosucts:', error);
    res.status(500).send('Error fetching prosuct. Please try again.');
  }
}

export const postEdit = async (req, res) => {
//   const batimentId = parseInt(req.params.batimentId, 10);
  
//   try {
//     const batiment = await Batiment.findByPk(batimentId);

//     if (!batiment) {
//       return res.status(404).send('batiment not found.');
//     }

//     // Update the user data with the form data
//     await batiment.update({
//       name: req.body.name,
//       adresse: req.body.adresse,
//       photo: req.file ? req.file.filename : batiment.photo, // Use existing photo if no new photo is uploaded
//     });

//     res.redirect(`/batiments/${batimentId}`);
//   } catch (error) {
//     console.error('Error updating batiment:', error);
//     res.status(500).send('Error updating batiment.');
//   }
};

export const editSalle = async (req, res) => {
  console.log("editSalle starting");
  try {
    const salleId = parseInt(req.params.productId, 10) // Assuming the salle's ID is passed as a route parameter
    const { name, capacity, price, batimentId } = req.body;
    const photo = req.file ? req.file.filename : null;
    console.log("|||||||||||||||||||", salleId);
    // Find the salle to be edited by its ID
    const salleToUpdate = await Product.findByPk(salleId);

    if (!salleToUpdate) {
      return res.status(404).send("Salle not found.");
    }

    // Update the salle's information
    salleToUpdate.name = name;
    salleToUpdate.capacity = capacity;
    salleToUpdate.price = price;
    salleToUpdate.batiment_id = batimentId;

    await salleToUpdate.save();

    if (photo) {
      // Add a new image if a photo is provided
      await Image.create({
        name: photo,
        type: "Product",
        product_id: salleId,
        description: null, // You can add a description if needed
      });
    }

    console.log('Salle updated:', salleToUpdate.toJSON());

    // Redirect to the salle's profile page or any other relevant page
    res.redirect(`/products/${salleId}`);

  } catch (error) {
    console.error('Error updating salle:', error);
    res.status(500).send('Error updating salle. Please try again.');
  }

  console.log("editSalle done");
};
