import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();
const { SESSION_SECRET } = process.env;

// Middleware to handle user registration
export const register = (req, res) => {
    // ...
    // Check if there's an error message in the session
    const errorMessage = req.session.errorMessage;
    // Clear the error message from the session
    delete req.session.errorMessage;
    // Render the register view with the error message as a local variable
    res.render('home/register', { errorMessage });
};
  
export const createUser = async (req, res) => {
    console.log("createUser starting")
    try {
        
        const { firstName, lastName, email, password, role } = req.body;
        console.log("test");
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user in the database with the hashed password
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword, // Store the hashed password in the database
            role,
        });
    
        const token = jwt.sign(
            {
                userId: newUser.id, // You can include any user-specific data in the token payload
                role: newUser.role,
            },
            SESSION_SECRET,
            { expiresIn: '1h' } // Token will expire in 1 hour
        );
        req.session.userId = newUser.id;
        req.session.role = newUser.role;
        req.session.firstName = newUser.firstName;
        req.session.lastName = newUser.lastName;
        
        console.log('User ID set in session:', req.session.userId);
        // console.log('User ID set in token:', token.userId);
        console.log('newUser.id:', newUser.id);
        console.log('New user created:', newUser.toJSON());
        res.redirect(`/dashboard?token=${token}`); // Redirect to the index page after successful user creation
        
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user. Please try again.');
    }
    console.log("createUser done")
  };