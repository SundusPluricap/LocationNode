import Batiment from "../models/batiment-model.js";
import Establishment from "../models/establishment-model.js";

import {batimentFindAllInEstablishment, batimentFindAll} from '../utiles/batiment.reqetes.js'
import {bigger_than,belongTo} from '../utiles/role.permission.js'
import dotenv from 'dotenv';
dotenv.config();
const { SESSION_SECRET } = process.env;

export const create = async (req, res) => {
  const user = req.session.user
  const establishments = await Establishment.findAll();
  // ...
  // Check if there's an error message in the session
  const errorMessage = req.session.errorMessage;
  // Clear the error message from the session
  delete req.session.errorMessage;
  res.render('batiments/createBatiment', { errorMessage, establishments, user });
};

export const createBatiment = async (req, res) => {
    console.log("createBatiment starting")
    try {
      const user = req.session.user
      let batiments;
      const { name,adresse } = req.body;
      const photo = req.file ? req.file.filename : null;
      let establishmentId = user.establishmentId;

      if (user.role === 'kingAdmin') {
        // If the logged-in user is kingAdmin, get the selected user's ID from the request body
        establishmentId = req.body.establishment;
      }

      const newBatiment = await Batiment.create({
        name,
        adresse,
        photo,
        establishmentId  
      });
      console.log('New Batiment created:', newBatiment.toJSON());

      if(user.role === "kingAdmin"){
        batiments = await batimentFindAll();
      }
      else{
        batiments = await batimentFindAllInEstablishment(user)
      }
      
      res.render('batiments/all-batiments', { user, batiments });
        
    } catch (error) {
      console.error('Error creating batiment:', error);
      res.status(500).send('Error creating batiment. Please try again.');
    }
    console.log("createBatiment done")
};


export const showAlleBatiments = async (req, res) => {
    
    try {      
      const user = req.session.user
      console.log("showAlleBatiments starting")
      
      let batiments;
      if(user.role === "kingAdmin"){
        batiments = await batimentFindAll();
      }
      else{
        batiments = await batimentFindAllInEstablishment(user)
      }
      // const batiments = await Batiment.findAll();
      
      
      res.render('batiments/all-batiments', { user, batiments });
      console.log("showAlleBatiments done")
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching batiments. Please try again.');
    }
};  


export const getProfileBatiment = async (req, res) => {
  console.log("getProfileBatiment starting")
  // const firstName = req.session.user.firstName;
  // const lastName = req.session.user.lastName;
  // const idUser = req.session.user.id;
  const user = req.session.user
  const batimentId = parseInt(req.params.batimentId, 10); // Extract the batiment ID from the URL parameter and parse it as an integer.

  try {
    // Find the batiment with the given ID in the database.
    const batiment = await Batiment.findOne({ where: { id: batimentId } });

    if (!batiment) {
      return res.status(404).render('home/404', {user}); // Handle the case when the batiment ID is not found.
    }
    const param = batiment
    // Render the batiment profile template with the batiment data.
    res.render('batiments/profileBatiment', {  user, param });
  } catch (error) {
    console.error('Error fetching Batiment:', error);
    res.status(500).send('Error fetching batiment. Please try again.');
  }
  console.log("getProfileBatiment done")
}


export const getEdit = async (req, res) => {
  // const firstName = req.session.user.firstName;
  // const lastName = req.session.user.lastName;
  // const idUser = req.session.user.id;
  const user = req.session.user
  const establishments = await Establishment.findAll();
  const batimentId = parseInt(req.params.batimentId, 10);

  try {
    // Find the batiment with the given ID in the database.
    const batiment = await Batiment.findOne({ where: { id: batimentId } });

    if (!batiment) {
      return res.status(404).render('home/404', {user}); // Handle the case when the batiment ID is not found.
    }
    const param = batiment
    // Render the batiment profile template with the batiment data.
    res.render('batiments/editProfile', { param, user,establishments });
    // res.render('batiments/profileClient', {  firstName, lastName, param });
  } catch (error) {
    console.error('Error fetching batiments:', error);
    res.status(500).send('Error fetching batiment. Please try again.');
  }
}

export const postEdit = async (req, res) => {
  const batimentId = parseInt(req.params.batimentId, 10);
  const user = req.session.user
  try {
    const batiment = await Batiment.findByPk(batimentId);

    if (!batiment) {
      return res.status(404).render('home/404', {user});
    }

    // Update the user data with the form data
    await batiment.update({
      name: req.body.name,
      adresse: req.body.adresse,
      photo: req.file ? req.file.filename : batiment.photo, // Use existing photo if no new photo is uploaded
    });

    res.redirect(`/batiments/${batimentId}`);
  } catch (error) {
    console.error('Error updating batiment:', error);
    res.status(500).send('Error updating batiment.');
  }
};

export const deleteBatiment = async (req, res) => {
//   console.log("here/////////////////////////////////////////////////////////////////////////////////////////////////////// req.params: ", req.params)
  const batimentId = parseInt(req.params.batimentId, 10);
  const user = req.session.user
  try {
    const batiment = await Batiment.findByPk(batimentId);

    if (!batiment) {
      return res.status(404).render('home/404', {user});
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