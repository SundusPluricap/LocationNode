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

  if (req.session.userId) {
    const firstName = req.session.firstName;
    const lastName = req.session.lastName;
    console.log("The user is logged in (using session)")
    
    if (req.session.role === 'admin') {
      // Admin-specific dashboard logic
      res.render('admin/dashboard', { firstName, lastName });
    } else {
      // Non-admin users will be redirected to another dashboard
      res.render('assistant/dashboard', { firstName, lastName });
    }
  }
  else {
    console.log("Redirect the user to the login page (token not provided)")
    return res.redirect('/login');
  }
  console.log("dashboard done")
  // jwt.verify(token, SESSION_SECRET, (err, decoded) => {
  //   if (err) {
  //     console.error("Error during token verification:", err);
  //     return res.status(403).json({ message: "Invalid or expired token." });
  //   }
    
    
  //   // Token is valid, extract the userId and role from the decoded token
  //   req.userId = decoded.userId;
  //   req.role = decoded.role;
  //   if (req.role === 'admin') {
  //     // Admin-specific dashboard logic
  //     res.render('admin-dashboard');
  //   } else {
  //     // Non-admin users will be redirected to another dashboard
  //     res.render('regular-dashboard');
  //   }
  //   console.log("role",req.role)
  //   console.log('User ID and role set in token:', req.userId, req.role);
    
  // });
  // console.log("dashboard starting")


  // console.log("role",req.userID)
  // if (req.user.role === 'admin') {
  //   // Admin-specific dashboard logic
  //   res.render('admin-dashboard');
  // } else {
  //   // Non-admin users will be redirected to another dashboard
  //   res.render('regular-dashboard');
  // }

  
  // res.render('home/dashboard', { posts: [] });
};