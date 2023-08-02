import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import Establishment from '../models/establishment-model.js';
dotenv.config();
const { SESSION_SECRET } = process.env;

// Middleware to handle user registration
export const register = async (req, res) => {
    // ...
    // Check if there's an error message in the session
    const establishments = await Establishment.findAll({});
    const errorMessage = req.session.errorMessage;
    // Clear the error message from the session
    delete req.session.errorMessage;
    res.render('users/register', { errorMessage,establishments });
};
  
export const createUser = async (req, res) => {
    console.log("createUser starting")
    try {
        
        const { firstName, lastName, email, password, role, establishmentId } = req.body;
        // console.log("--------------------------------------",req.body);
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user in the database with the hashed password
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword, // Store the hashed password in the database
            role,
            establishmentId
        });
    
        const token = jwt.sign(
            {
                userId: newUser.id, // You can include any user-specific data in the token payload
                role: newUser.role,
            },
            SESSION_SECRET,
            { expiresIn: '1h' } // Token will expire in 1 hour
        );
        req.session.user = newUser;
        
        console.log('User ID set in session:', req.session.user.id);
        // console.log('User ID set in token:', token.userId);
        // console.log('newUser.id:', newUser.id);
        console.log('New user created:', newUser.toJSON());

        const users = await User.findAll();
        const user = req.session.user
        res.render('users/users', { user, users });
        // res.redirect(`/dashboard`); // Redirect to the index page after successful user creation
        
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user. Please try again.');
    }
    console.log("createUser done")
  };