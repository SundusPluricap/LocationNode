// Middleware to check if the user already exists
import User from "../models/user-model.js";
// Middleware to check if the user already exists
export const checkUserExistence = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ where: { email } });

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
};



// Middleware to check if the user is logged in (authentication check)
export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    // The user is logged in
    next();
  } else {
    // Redirect the user to the login page if not logged in
    res.redirect('/login');
  }
};