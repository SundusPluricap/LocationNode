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
    // Render the register view with the error message as a local variable
    res.render('clients/createClient', { errorMessage });
};

export const createClient = async (req, res) => {
    console.log("createClient starting")
    try {
        
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
    
        res.render('clients/all-clients', { firstName, lastName, clients });
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
      const firstName = req.session.user.firstName;
      const lastName = req.session.user.lastName;
      console.log("clients", clients)
      // Render the EJS template with the user data
      res.render('clients/all-clients', { clients , firstName, lastName});
      console.log("showAllClients done")
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching client. Please try again.');
    }
};  