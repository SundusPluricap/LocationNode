import Client from "../models/client-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();
const { SESSION_SECRET } = process.env;

export const create = (req, res) => {
    // ...
    // Check if there's an error message in the session
    const errorMessage = req.session.errorMessage;
    // Clear the error message from the session
    delete req.session.errorMessage;
    res.render('clients/createClient', { errorMessage });
};

export const createClient = async (req, res) => {
  console.log("createClient starting")
  try {
    const user = req.session.user
    const { firstName, lastName, email, phoneNumber } = req.body;
    console.log("test", req.body);
    console.log("phoneNumber", phoneNumber);
    const idUser = req.session.user.id
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database with the hashed password
    const newClient = await Client.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      idUser 
    });

    // const token = jwt.sign(
    //     {
    //         userId: newClient.id, // You can include any user-specific data in the token payload
    //         role: newClient.role,
    //     },
    //     SESSION_SECRET,
    //     { expiresIn: '1h' } // Token will expire in 1 hour
    // );
    // req.session.user = newUser;
    
    console.log('User ID set in session:', req.session.user.id);
    // console.log('User ID set in token:', token.userId);
    // console.log('newUser.id:', newUser.id);
    console.log('New Client created:', newClient.toJSON());

    const clients = await Client.findAll();

    res.render('clients/all-clients', { user, clients, idUser });
    // res.redirect("/clients",{ firstName, lastName, clients }); // Redirect to the index page after successful user creation
    
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).send('Error creating client. Please try again.');
  }
  console.log("createClients done")
};


export const showAllClients = async (req, res) => {
    try {
      console.log("showAllClients starting")
      // Fetch all users from the database
      const clients = await Client.findAll();
      const user = req.session.user
      console.log("clients", clients)
      // Render the EJS template with the user data
      res.render('clients/all-clients', { clients , user});
      console.log("showAllClients done")
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching client. Please try again.');
    }
};  


export const getProfile = async (req, res) => {
  console.log("getProfile starting")
  const user = req.session.user
  const clientId = parseInt(req.params.clientId, 10); // Extract the client ID from the URL parameter and parse it as an integer.

  try {
    // Find the client with the given ID in the database.
    const client = await Client.findOne({ where: { id: clientId } });

    if (!client) {
      return res.status(404).send('Client not found.'); // Handle the case when the client ID is not found.
    }
    const param = client
    // Render the client profile template with the client data.
    res.render('clients/profileClient', {  user, param });
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
  const user = req.session.user
  const clientId = parseInt(req.params.clientId, 10);

  try {
    // Find the client with the given ID in the database.
    const client = await Client.findOne({ where: { id: clientId } });

    if (!client) {
      return res.status(404).send('Client not found.'); // Handle the case when the client ID is not found.
    }
    const param = client
    // Render the client profile template with the client data.
    res.render('clients/editProfile', { param, user });
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

    // if(user.id === req.session.user.id){
    //   req.session.user = user
    // }
    // console.log("user update: " , user)
    // console.log("user logged in: " , req.session.user)
    // Redirect to the user's profile page after successful update
    res.redirect(`/clients/${clientId}`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user.');
  }
};

export const deleteClient = async (req, res) => {
  console.log("here/////////////////////////////////////////////////////////////////////////////////////////////////////// req.params: ", req.params)
  const clientId = parseInt(req.params.clientId, 10);
  
  try {
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).send('client not found.');
    }

    // Delete the user from the database
    await client.destroy();

    // Redirect to the list of all users or another page after successful deletion
    res.redirect('/clients'); // Adjust the URL to redirect to the appropriate page after deletion
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).send('Error deleting client.');
  }
};
