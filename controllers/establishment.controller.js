import Establishment from "../models/establishment-model.js";

import dotenv from 'dotenv';
dotenv.config();
const { SESSION_SECRET } = process.env;

export const create = (req, res) => {
  const user = req.session.user

  // console.log("here-----------------------------user",user)
  // Check if there's an error message in the session
  const errorMessage = req.session.errorMessage;
  // Clear the error message from the session
  delete req.session.errorMessage;

  res.render('establishments/createEstablishment', { errorMessage, user });
};

export const createEstablishment = async (req, res) => {
    console.log("createEstablishment starting")
    try {
        const user = req.session.user
        const { name } = req.body;
        const successMessage = req.session.successMessage;
       delete req.session.successMessage;
        const newEstablishment = await Establishment.create({
          name
        });
    
        console.log('New Establishment created:', newEstablishment.toJSON());

        const establishments = await Establishment.findAll();
    
        res.render('establishments/all-establishments', { user, establishments,successMessage });
        // res.redirect("/establishments",{ firstName, lastName, establishments }); // Redirect to the index page after successful user creation
        
    } catch (error) {
      console.error('Error creating establishment:', error);
      res.status(500).send('Error creating establishment. Please try again.');
    }
    console.log("createEstablishment done")
};


export const showAlleEstablishments = async (req, res) => {
    try {
      const successMessage = req.session.successMessage;
      console.log("_______________successMessage yyayayayayayayayayay____________________",successMessage,'___________here here')
      delete req.session.successMessage;
      console.log("showAlleEstablishments starting")
      // Fetch all users from the database
      const establishments = await Establishment.findAll();
      const user = req.session.user
    //   console.log("establishments", establishments)
      // Render the EJS template with the user data
      res.render('establishments/all-establishments', { user, establishments,successMessage });
      console.log("showAlleEstablishments done")
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching establishments. Please try again.');
    }
};  


// export const getProfileEstablishment = async (req, res) => {
//   console.log("getProfileEstablishment starting")
//   const firstName = req.session.user.firstName;
//   const lastName = req.session.user.lastName;
//   const establishmentId = parseInt(req.params.establishmentId, 10); // Extract the establishment ID from the URL parameter and parse it as an integer.

//   try {
//     // Find the establishment with the given ID in the database.
//     const establishment = await Establishment.findOne({ where: { id: establishmentId } });

//     if (!establishment) {
//       return res.status(404).send('Establishment not found.'); // Handle the case when the establishment ID is not found.
//     }
//     const param = establishment
//     // Render the establishment profile template with the establishment data.
//     res.render('establishments/profileEstablishment', {  firstName, lastName, param });
//   } catch (error) {
//     console.error('Error fetching Establishment:', error);
//     res.status(500).send('Error fetching establishment. Please try again.');
//   }
//   console.log("getProfileEstablishment done")
// }


export const getEdit = async (req, res) => {
  // const firstName = req.session.user.firstName;
  // const lastName = req.session.user.lastName;
  // const idUser = req.session.user.id;
  const user = req.session.user
  const establishmentId = parseInt(req.params.establishmentId, 10);

  try {
    // Find the establishment with the given ID in the database.
    const establishment = await Establishment.findOne({ where: { id: establishmentId } });

    if (!establishment) {
      return res.status(404).send('Establishment not found.'); // Handle the case when the establishment ID is not found.
    }
    const param = establishment
    // Render the establishment profile template with the establishment data.
    res.render('establishments/editProfile', { param, user});
    // res.render('establishments/profileClient', {  firstName, lastName, param });
  } catch (error) {
    console.error('Error fetching establishments:', error);
    res.status(500).send('Error fetching establishment. Please try again.');
  }
}

export const postEdit = async (req, res) => {
  const establishmentId = parseInt(req.params.establishmentId, 10);
  
  try {
    const establishment = await Establishment.findByPk(establishmentId);

    if (!establishment) {
      return res.status(404).send('establishment not found.');
    }

    // Update the user data with the form data
    await establishment.update({
      name: req.body.name
    });

    // if(user.id === req.session.user.id){
    //   req.session.user = user
    // }
    // console.log("user update: " , user)
    // console.log("user logged in: " , req.session.user)
    // Redirect to the user's profile page after successful update
    res.redirect(`/establishments`);
  } catch (error) {
    console.error('Error updating establishment:', error);
    res.status(500).send('Error updating establishment.');
  }
};

export const deleteEstablishment = async (req, res) => {
  const user = req.session.user
  
  const establishmentId = parseInt(req.params.establishmentId, 10);
  if (user.role === "kingAdmin" || user.establishmentId == establishmentId){

    try {
      const establishment = await Establishment.findByPk(establishmentId);
  
      if (!establishment) {
        return res.status(404).send('establishment not found.');
      }
  
      // Delete the user from the database
      await establishment.destroy();
  
      // Redirect to the list of all users or another page after successful deletion
      res.redirect('/establishments'); // Adjust the URL to redirect to the appropriate page after deletion
    } catch (error) {
      console.error('Error deleting establishment:', error);
      res.status(500).send('Error deleting establishment.');
    }
  } 
  else {
    res.status(403).redirect('/');
  }

};