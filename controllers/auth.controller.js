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
    // const firstName = req.session.user.firstName;
    // const lastName = req.session.user.lastName;
    // const idUser = req.session.user.id;
    console.log("The user is logged in (using session)")
    
    res.render('home/dashboard', { user });
    // if (req.session.user.role === 'admin') {
    //   // Admin-specific dashboard logic
    //   res.render('admin/dashboard', { user });
    // } else {
    //   // Non-admin users will be redirected to another dashboard
    //   res.render('assistant/dashboard', { user });
    // }
  }
  else {
    console.log("Redirect the user to the login page (token not provided)")
    return res.redirect('/login');
  }
  console.log("dashboard done")
  
};