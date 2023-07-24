import Client from "../models/client-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";

import dotenv from 'dotenv';
dotenv.config();
const { SESSION_SECRET } = process.env;

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

        // const clients = await Client.findAll();
        next();
        // res.render('clients/all-clients', { firstName, lastName, clients });
        // res.redirect("/clients",{ firstName, lastName, clients }); // Redirect to the index page after successful user creation
        
    } catch (error) {
      console.error('Error creating client:', error);
      res.status(500).send('Error creating client. Please try again.');
    }
    console.log("createClients done")
};
