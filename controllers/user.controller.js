

import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import Establishment from '../models/establishment-model.js';
import {bigger_than, establishmentCheck} from '../utiles/role.permission.js'
dotenv.config();
const { SESSION_SECRET } = process.env;

// Middleware to handle user registration
export const register = async (req, res) => {
  const user = req.session.user
  // Check if there's an error message in the session
  const establishments = await Establishment.findAll({});
  const errorMessage = req.session.errorMessage;
  // Clear the error message from the session
  delete req.session.errorMessage;
  res.render('users/register', { errorMessage,establishments, user });
};
  
export const createUser = async (req, res) => {
  console.log("createUser starting")
  
  try {
    const user = req.session.user
    const errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    
    const { firstName, lastName, email, password, role, establishmentId } = req.body;
    // console.log("--------------------------------------",req.body);
    let establishment
    if(!establishmentId || user.role !== "kingAdmin"){
      
      establishment = user.establishmentId
    }else{
      establishment = establishmentId
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database with the hashed password
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password in the database
      role,
      establishmentId:establishment
    });

    const token = jwt.sign(
      {
        userId: newUser.id, // You can include any user-specific data in the token payload
        role: newUser.role,
      },
      SESSION_SECRET,
      { expiresIn: '1h' } // Token will expire in 1 hour
    );
    // req.session.user = newUser;
    
    console.log('User ID set in session:', req.session.user.id);
    // console.log('User ID set in token:', token.userId);
    // console.log('newUser.id:', newUser.id);
    console.log('New user created:', newUser.toJSON());
    
    let users;

    if (user.role === "kingAdmin") {
      // If the user is a "kingAdmin", fetch all users
      users = await User.findAll();
    } else {
      // If the user is not a "kingAdmin", fetch users with the same establishment ID
      users = await User.findAll({
        where: {
          establishmentId: user.establishmentId
        }
      });
    }
    
    res.render('users/users', { user, users, errorMessage });
    // res.redirect(`/dashboard`); // Redirect to the index page after successful user creation
      
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user. Please try again.');
  }
  console.log("createUser done")
};


export const showAllUsers = async (req, res) => {
  try {
    const errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    console.log("showAllUsers starting")
    // Fetch the user from the session
    const user = req.session.user;
    
    // role_has_permission(user.role, "list")
    let users;

    if (user.role === "kingAdmin") {
      // If the user is a "kingAdmin", fetch all users
      users = await User.findAll();
    } else {
      // If the user is not a "kingAdmin", fetch users with the same establishment ID
      users = await User.findAll({
        where: {
          establishmentId: user.establishmentId
        }
      });
    }
    
    // Render the EJS template with the user data
    res.render('users/users', { users, user, errorMessage });
    console.log("showAllUsers done")
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users. Please try again.');
  }
};


export const getProfile = async (req, res) => {
  const user = req.session.user;
  const userId = parseInt(req.params.userId, 10);
  
  // role_has_permission(user.role, "view")
  try {
    const findUser = await User.findOne({
      where: { id: userId },
      include: Establishment, // Include the associated Establishment model
    });

    if (!findUser) {
      return res.status(404).send('User not found.');
    }
    if ((bigger_than(user.role, findUser.role) || user.id == findUser.id) && establishmentCheck(findUser.Establishment.id, user.Establishment.id, user.role)  ){
      res.render('users/profile', { user, findUser});
    }
    else {
      res.render('home/403', {user})
    }

    
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    return res.status(500).send('Internal Server Error');
  }
}

export const getEdit = async (req, res) => {
  const user = req.session.user
  const userId = parseInt(req.params.userId, 10);
  
  const establishments = await Establishment.findAll({});
  const findUser = await User.findOne({
      where: { id: userId },
      include: Establishment, // Include the associated Establishment model
    });

  if (!findUser) {
    return res.status(404).send('User not found.');
  }
  if ((bigger_than(user.role, findUser.role) || user.id == findUser.id) && establishmentCheck(findUser.Establishment.id, user.Establishment.id, user.role)  ){
    res.render('users/editProfile', { user, findUser, establishments});
  }
  else {
    res.render('home/403', {user})
  }

  // Render the edit profile template with the user data
    
}


export const postEdit = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    console.log("here------------------reqbody", req.body)
    // Update the user data with the form data
    await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      establishmentId : req.body.establishmentId
    });

    if(user.id === req.session.user.id){
      req.session.user = user
    }
    // console.log("user update: " , user)
    // console.log("user logged in: " , req.session.user)
    // Redirect to the user's profile page after successful update
    res.redirect(`/users/${userId}`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user.');
  }
};

export const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = req.session.user
  try {
    const findUser = await User.findByPk(userId);

    if (!findUser) {
      return res.status(404).send('User not found.');
    }

    if ((bigger_than(user.role, findUser.role) || user.id == findUser.id) && establishmentCheck(findUser.establishmentId, user.Establishment.id, user.role)  ){
      await findUser.destroy();
      res.redirect('/users');
    }
    else {
      res.render('home/403', {user})
    }
    
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user.');
  }
};