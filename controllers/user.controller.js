

import User from "../models/user-model.js";

export const showAllUsers = async (req, res) => {
  try {
    console.log("showAllUsers starting")
    // Fetch all users from the database
    const users = await User.findAll();
    const firstName = req.session.user.firstName;
    const lastName = req.session.user.lastName;
    // Render the EJS template with the user data
    res.render('users/users', { users , firstName, lastName});
    console.log("showAllUsers done")
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users. Please try again.');
  }
};

export const getProfile = async (req, res) => {
  const firstName = req.session.user.firstName;
  const lastName = req.session.user.lastName;
  const userId = parseInt(req.params.userId, 10); // Extract the user ID from the URL parameter and parse it as an integer.
  const users = await User.findAll();
  // Find the user with the given ID in the users array or database.
  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).send('User not found.'); // Handle the case when the user ID is not found.
  }

  // Render the user profile template with the user data.
  res.render('users/profile', { user, firstName, lastName });
}