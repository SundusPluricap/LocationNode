import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const index = (req, res) => {
  res.render('home/index', { posts: [] });
};

export const dashboard = (req, res) => {
  res.render('home/dashboard', { posts: [] });
};



export const login = (req, res) => {
  const errorMessage = req.session.errorMessage;
  // Clear the error message from the session
  delete req.session.errorMessage;
  res.render('home/login', { errorMessage });
};

export const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the given email in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.session.errorMessage = 'Invalid email or password';
      return res.redirect('/login');
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      req.session.errorMessage = 'Invalid email or password';
      return res.redirect('/login');
    }

    // Set the user ID in the session to keep track of the authenticated user
    req.session.userId = user.id;

    // Redirect the user to the desired page after successful login (e.g., dashboard, home)
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login. Please try again.');
  }
};





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

    console.log('New user created:', newUser.toJSON());
    res.redirect('/dashboard'); // Redirect to the index page after successful user creation
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user. Please try again.');
  }
};