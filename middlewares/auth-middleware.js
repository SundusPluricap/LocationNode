// Middleware to check if the user already exists
import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const { SESSION_SECRET } = process.env;

// Middleware to check if the user already exists
export const checkUserExistence = async (req, res, next) => {
  try {
    console.log("checkUserExistence starting")
    const { email } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    req.session.user = existingUser;

    console.log("shiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii req.session.user: " , req.session.user)
    if (existingUser) {
      req.session.errorMessage = 'User with this email already exists.';
      return res.redirect('/userExist');
    }

    // User does not exist, proceed to the next middleware (createUser)
    next();
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).send('Error checking user existence. Please try again.');
  }
  console.log("checkUserExistence done")
};

// Middleware to check if the user is logged in (authentication check)
// export const isAuthenticateds = (req, res, next) => {
//   console.log("isAuthenticated starting")
//   if (req.session.userId) {
//     console.log("The user is logged in")
//     // The user is logged in
//     next();
//   } else {
//     console.log("Redirect the user to the login page if not logged in")
//     // Redirect the user to the login page if not logged in
//     res.redirect('/login');
//   }
//   console.log("isAuthenticated done")
// };



// Middleware to check if the user is logged in (authentication check)
export const isAuthenticated = (req, res, next) => {
  try {
    console.log("isAuthenticated starting")
    const token = req.query.token || req.body.token || req.headers["x-access-token"];
    console.log("req.session ", req.session)
    if (req.session.user) {
      console.log("The user is logged in (using session)")
      // The user is logged in (using the session)
      return next(); // Move to the next middleware or route handler
    }
    // If token is not provided, redirect the user to the login page
    if (!token) {
      console.log("Redirect the user to the login page (token not provided)")
      return res.redirect('/login');
    }

     

    // Verify the token
    jwt.verify(token, SESSION_SECRET, (err, decoded) => {
      if (err) {
        console.error("Error during token verification:", err);
        return res.status(403).json({ message: "Invalid or expired token." });
      }

      // Token is valid, extract the userId and role from the decoded token
      req.userId = decoded.userId;
      req.role = decoded.role;
      console.log('User ID and role set in token:', req.userId, req.role);
      next();
    });
    console.log("isAuthenticated done")
  } catch (error) {
    console.error("Error during token verification:", error);
    res.status(500).json({ message: "Error during token verification." });
  }
};
