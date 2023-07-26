import Batiment from "../models/batiment-model.js";
import dotenv from 'dotenv';
dotenv.config();
const { SESSION_SECRET } = process.env;

export const create = (req, res) => {
    // ...
    // Check if there's an error message in the session
    const errorMessage = req.session.errorMessage;
    // Clear the error message from the session
    delete req.session.errorMessage;
    // Render the register view with the error message as a local variable
    res.render('batiments/createBatiment', { errorMessage });
};

export const createBatiment = async (req, res) => {
    console.log("createBatiment starting")
    try {
        const firstName = req.session.user.firstName
        const lastName = req.session.user.lastName
        console.log("req.body//////////////////////", req.body)
        const { name,adresse,photo } = req.body;
        const newBatiment = await Batiment.create({
            name,
            adresse,
            photo
        });
        console.log('New Batiment created:', newBatiment.toJSON());

        const batiments = await Batiment.findAll();
    
        res.render('batiments/all-batiments', { firstName, lastName,  batiments });
        
    } catch (error) {
      console.error('Error creating batiment:', error);
      res.status(500).send('Error creating batiment. Please try again.');
    }
    console.log("createBatiment done")
};


export const showAlleBatiments = async (req, res) => {
    try {
      console.log("showAlleBatiments starting")
      // Fetch all users from the database
      const batiments = await Batiment.findAll();
      const firstName = req.session.user.firstName;
      const lastName = req.session.user.lastName;
    //   console.log("batiments", batiments)
      // Render the EJS template with the user data
      res.render('batiments/all-batiments', { firstName, lastName, batiments });
      console.log("showAlleBatiments done")
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching batiments. Please try again.');
    }
};  


export const getProfileBatiment = async (req, res) => {
  console.log("getProfileBatiment starting")
  const firstName = req.session.user.firstName;
  const lastName = req.session.user.lastName;
  const batimentId = parseInt(req.params.batimentId, 10); // Extract the batiment ID from the URL parameter and parse it as an integer.

  try {
    // Find the batiment with the given ID in the database.
    const batiment = await Batiment.findOne({ where: { id: batimentId } });

    if (!batiment) {
      return res.status(404).send('Batiment not found.'); // Handle the case when the batiment ID is not found.
    }
    const param = batiment
    // Render the batiment profile template with the batiment data.
    res.render('batiments/profileBatiment', {  firstName, lastName, param });
  } catch (error) {
    console.error('Error fetching Batiment:', error);
    res.status(500).send('Error fetching batiment. Please try again.');
  }
  console.log("getProfileBatiment done")
}



export const getBatimentPhoto = async (req, res) => {
  const batimentId = parseInt(req.params.batimentId, 10);

  try {
    const batiment = await Batiment.findOne({ where: { id: batimentId } });

    if (!batiment || !batiment.photo) {
      return res.status(404).send('Batiment photo not found.');
    }

    res.set('Content-Type', 'image/*'); // Set the appropriate content type for the image (e.g., 'image/jpeg', 'image/png')
    res.send(batiment.photo);
  } catch (error) {
    console.error('Error fetching Batiment photo:', error);
    res.status(500).send('Error fetching batiment photo. Please try again.');
  }
};


export const getEdit = async (req, res) => {
  const firstName = req.session.user.firstName;
  const lastName = req.session.user.lastName;
  const batimentId = parseInt(req.params.batimentId, 10);

  try {
    // Find the batiment with the given ID in the database.
    const batiment = await Batiment.findOne({ where: { id: batimentId } });

    if (!batiment) {
      return res.status(404).send('Batiment not found.'); // Handle the case when the batiment ID is not found.
    }
    const param = batiment
    // Render the batiment profile template with the batiment data.
    res.render('batiments/editProfile', { param, firstName, lastName });
    // res.render('batiments/profileClient', {  firstName, lastName, param });
  } catch (error) {
    console.error('Error fetching batiments:', error);
    res.status(500).send('Error fetching batiment. Please try again.');
  }
}

export const postEdit = async (req, res) => {
  const batimentId = parseInt(req.params.batimentId, 10);
  
  try {
    const batiment = await Batiment.findByPk(batimentId);

    if (!batiment) {
      return res.status(404).send('batiment not found.');
    }

    // Update the user data with the form data
    await batiment.update({
      name: req.body.name
    });

    // if(user.id === req.session.user.id){
    //   req.session.user = user
    // }
    // console.log("user update: " , user)
    // console.log("user logged in: " , req.session.user)
    // Redirect to the user's profile page after successful update
    res.redirect(`/batiments`);
  } catch (error) {
    console.error('Error updating batiment:', error);
    res.status(500).send('Error updating batiment.');
  }
};

export const deleteBatiment = async (req, res) => {
//   console.log("here/////////////////////////////////////////////////////////////////////////////////////////////////////// req.params: ", req.params)
  const batimentId = parseInt(req.params.batimentId, 10);
  
  try {
    const batiment = await Batiment.findByPk(batimentId);

    if (!batiment) {
      return res.status(404).send('batiment not found.');
    }

    // Delete the user from the database
    await batiment.destroy();

    // Redirect to the list of all users or another page after successful deletion
    res.redirect('/batiments'); // Adjust the URL to redirect to the appropriate page after deletion
  } catch (error) {
    console.error('Error deleting batiment:', error);
    res.status(500).send('Error deleting batiment.');
  }
};