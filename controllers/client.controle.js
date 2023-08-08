import Client from "../models/client-model.js";
import User from "../models/user-model.js";
import Establishment from "../models/establishment-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import {bigger_than,belongTo} from '../utiles/role.permission.js'
import {clientFindOne,clientFindAll, clientFindAllInOneEstablishment} from '../utiles/client.reqetes.js'
import {getUsersOrderedByEstablishmentId} from '../utiles/user.requete.js'

dotenv.config();
const { SESSION_SECRET } = process.env;

export const create = async (req, res) => {
    const users = await getUsersOrderedByEstablishmentId()
    const user = req.session.user;
    // ...
    // Check if there's an error message in the session
    const errorMessage = req.session.errorMessage;
    // Clear the error message from the session
    delete req.session.errorMessage;
    res.render('clients/createClient', { errorMessage,users,user });
};

export const createClient = async (req, res) => {
  console.log("createClient starting");
  try {
    const user = req.session.user;
    const { firstName, lastName, email, phoneNumber } = req.body;
    let idUser = req.session.user.id; // Default to the logged-in user's ID

    if (user.role === 'kingAdmin') {
      // If the logged-in user is kingAdmin, get the selected user's ID from the request body
      idUser = req.body.userName;
    }

    // Create a new client in the database
    const newClient = await Client.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      idUser 
    });

    console.log('User ID set in session:', req.session.user.id);
    console.log('New Client created:', newClient.toJSON());

    // Redirect to the desired link after successful client creation
    res.redirect('/clients'); // Replace '/another-link' with the actual URL you want to redirect to
    
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).send('Error creating client. Please try again.');
  }
  console.log("createClients done");
};



export const showAllClients = async (req, res) => {
  try {
    console.log("showAllClients starting");
    const user = req.session.user; // Assuming you have the user data in the session

    if (!user) {
      // Handle cases where user is not authenticated
      res.status(401).send('User not authenticated.');
      return;
    }
    let clients
    // Check if the user's role is 'kingAdmin'
    if (user.role === 'kingAdmin') {
      // Fetch all clients since the user has 'kingAdmin' role
      clients = await clientFindAll()
      
      
    } else if (user.establishmentId) {
      // Fetch clients associated with the user's establishment
      clients = await clientFindAllInOneEstablishment(user.establishmentId)
      // console.log("clients", clients.user);
    } else {
      // Handle cases where user's role is not 'kingAdmin' and no establishment is associated
      res.status(403).send('Access denied.');
    }

    res.render('clients/all-clients', { clients, user });
    console.log("showAllClients done");
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).send('Error fetching clients. Please try again.');
  }
};  


export const getProfile = async (req, res) => {
  console.log("getProfile starting")
  const user = req.session.user
  const clientId = parseInt(req.params.clientId, 10); // Extract the client ID from the URL parameter and parse it as an integer.

  try {
    const param = await clientFindOne(clientId);

    if (!param) {
      return res.status(404).send('Client not found.');
    }
    // Render the client profile template with the client data.
    res.render('clients/profileClient', {  user, param, bigger_than, belongTo });
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).send('Error fetching client. Please try again.');
  }
  console.log("getProfile done")
}


export const getEdit = async (req, res) => {
  // const firstName = req.session.user.firstName;
  // const lastName = req.session.user.lastName;
  // const idUser = req.session.user.id;
  const users = await getUsersOrderedByEstablishmentId()
  const user = req.session.user
  const clientId = parseInt(req.params.clientId, 10);

  try {
    // Find the client with the given ID in the database.
    const param = await clientFindOne(clientId);

    if (!param) {
      return res.status(404).send('Client not found.'); // Handle the case when the client ID is not found.
    }

    if (bigger_than(user.role, param.User.role) || belongTo(param.User.id,user.id)){
      res.render('clients/editProfile', { param, user, users });
    }
    else{
      // Render the client profile template with the client data.
      res.render('home/403', {user})
    }
    
    // res.render('clients/profileClient', {  firstName, lastName, param });
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).send('Error fetching client. Please try again.');
  }
}

export const postEdit = async (req, res) => {
  const clientId = parseInt(req.params.clientId, 10);
  
  try {
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).send('User not found.');
    }

    // Update the user data with the form data
    await client.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    });

    res.redirect(`/clients/${clientId}`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user.');
  }
};

export const deleteClient = async (req, res) => {
  console.log("here/////////////////////////////////////////////////////////////////////////////////////////////////////// req.params: ", req.params)
  const clientId = parseInt(req.params.clientId, 10);
  const user = req.session.user

  try {
    const client = await clientFindOne(clientId);

    if (!client) {
      return res.status(404).send('client not found.');
    }

    if ((bigger_than(user.role, client.User.role) || user.id == client.User.id) || belongTo(client.User.id,user.id) ){

      // Delete the client from the database
      await client.destroy();
      // Redirect to the list of all the clients after successful deletion
      res.redirect('/clients');
    }
    else {
      res.render('home/403', {user})
    }
    // Adjust the URL to redirect to the appropriate page after deletion
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).send('Error deleting client.');
  }
};
