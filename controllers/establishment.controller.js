import Establishment from "../models/establishment-model.js";
import {getUsersOrderedByEstablishmentId,getPermissionForUser, specificUser} from '../utiles/user.requete.js'
import {isKing, findSuperAdminOfUser, setAllPermissionsByDefault} from '../utiles/role.js'
import {belongTo} from '../utiles/role.permission.js'
import {createEstablishmentWithDefaults} from '../utiles/defaultCreation.js'
import dotenv from 'dotenv';
dotenv.config();
const { SESSION_SECRET, CREATE_ESTABLISHMENT,  VIEW_ESTABLISHMENT,  EDIT_ESTABLISHMENT,  DELETE_ESTABLISHMENT } = process.env;

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
      await createEstablishmentWithDefaults(req)
      res.redirect('/establishments');
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
      delete req.session.successMessage;
      console.log("showAlleEstablishments starting")

         
      // Fetch all users from the database
      const establishments = await Establishment.findAll();
      const user = req.session.user
      if (user.role === "kingAdmin" || user.role === "superAdmin"){
        res.render('establishments/all-establishments', { user, establishments,successMessage });
      }else{
        res.render('home/403', { user });
      }
      // Render the EJS template with the data
      
      console.log("showAlleEstablishments done")
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching establishments. Please try again.');
    }
};  


export const getProfile = async (req, res) => {
  console.log("getProfileEstablishment starting")
  const user = req.session.user
  const establishmentId = parseInt(req.params.establishmentId, 10); // Extract the establishment ID from the URL parameter and parse it as an integer.

  const userPermissions = await getPermissionForUser(user.id);
  let viewPermission = userPermissions.some(perm => perm.name.trim() === VIEW_ESTABLISHMENT)
  let editPermission = userPermissions.some(perm => perm.name.trim() === EDIT_ESTABLISHMENT)
  let deletePermission = userPermissions.some(perm => perm.name.trim() === DELETE_ESTABLISHMENT)
   
  try {
    // Find the establishment with the given ID in the database.
    const establishment = await Establishment.findOne({ where: { id: establishmentId } });

    if (!establishment) {
      return res.status(404).render('home/404', {user}); // Handle the case when the establishment ID is not found.
    }
    const param = establishment

    let hasPermission = isKing(user) || (viewPermission && belongTo(param.id,user.establishmentId)) 
   
    if(hasPermission ){
      res.render('establishments/profileEstablishment', {  user, param, editPermission, deletePermission, isKing,belongTo });
    }
    else {
      res.render('home/403', {user})
    }
    // Render the establishment profile template with the establishment data.
    
  } catch (error) {
    console.error('Error fetching Establishment:', error);
    res.status(500).send('Error fetching establishment. Please try again.');
  }
  console.log("getProfileEstablishment done")
}


export const getEdit = async (req, res) => {
  const user = req.session.user
  const establishmentId = parseInt(req.params.establishmentId, 10);
  const userPermissions = await getPermissionForUser(user.id);

  let editPermission = userPermissions.some(perm => perm.name.trim() === EDIT_ESTABLISHMENT)

  try {
    // Find the establishment with the given ID in the database.
    const establishment = await Establishment.findOne({ where: { id: establishmentId } });

    if (!establishment) {
      return res.status(404).render('home/404', {user}); // Handle the case when the establishment ID is not found.
    }
    const param = establishment
    // Render the establishment profile template with the establishment data.
    let hasPermission = isKing(user) || (editPermission && belongTo(param.id,user.establishmentId)) 
    // console.log('-----------editPermission--------',hasPermission)
      // if 
    if(hasPermission ){
      res.render('establishments/editProfile', { param, user});

    }

    else {
      res.render('home/403', {user})
    }
    
    // res.render('establishments/profileClient', {  firstName, lastName, param });
  } catch (error) {
    console.error('Error fetching establishments:', error);
    res.status(500).send('Error fetching establishment. Please try again.');
  }
}

export const postEdit = async (req, res) => {
  const user = req.session.user
  const establishmentId = parseInt(req.params.establishmentId, 10);
  const { name, adresse, codePostal, country, SIRET, bankName, IBAN, BIC } = req.body;
  
  try {
    const establishment = await Establishment.findByPk(establishmentId);

    if (!establishment) {
      return res.status(404).render('home/404', {user});
    }

    // Update the user data with the form data
    await establishment.update({
      name,
      adresse,
      codePostal,
      country,
      SIRET,
      bankName,
      IBAN,
      BIC,
    });

    res.redirect(`/establishments`);
  } catch (error) {
    console.error('Error updating establishment:', error);
    res.status(500).send('Error updating establishment.');
  }
};

export const deleteEstablishment = async (req, res) => {
  const user = req.session.user
  const userPermissions = await getPermissionForUser(user.id);
  let deletePermission = userPermissions.some(perm => perm.name.trim() === DELETE_ESTABLISHMENT)

  const establishmentId = parseInt(req.params.establishmentId, 10);
  if (user.role === "kingAdmin" || user.establishmentId == establishmentId){

    try {
      const establishment = await Establishment.findByPk(establishmentId);
  
      if (!establishment) {
        return res.status(404).render('home/404', {user});
      }
  
      let hasPermission = isKing(user) || (deletePermission &&  belongTo(establishment.id,user.establishmentId))

      if ( hasPermission ){
        await establishment.destroy();
  
        // Redirect to the list of all users or another page after successful deletion
        res.redirect('/establishments');
      }
      else {
        res.render('home/403', {user})
      }
      
    } catch (error) {
      console.error('Error deleting establishment:', error);
      res.status(500).send('Error deleting establishment.');
    }
  } 
  else {
    res.status(403).render('home/403', {user});
  }

};