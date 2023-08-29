import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();
const { SESSION_SECRET } = process.env;

export const index = (req, res) => {
  res.render('home/index', { posts: [] });
};

export const dashboard = (req, res) => {
  console.log("dashboard start")

  if (req.session.user.id) {
    const user = req.session.user
    
    // console.log("The user is logged in (using session)")
    
    res.render('home/dashboard', { user });
    
  }
  else {
    console.log("Redirect the user to the login page (token not provided)")
    return res.redirect('/login');
  }
  console.log("dashboard done")
  
};