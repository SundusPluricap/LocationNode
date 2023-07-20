

import User from "../models/user-model.js";

export const showAllUsers = async (req, res) => {
  try {
    console.log("showAllUsers starting")
    // Fetch all users from the database
    const users = await User.findAll();
    const firstName = req.session.user.firstName;
    const lastName = req.session.user.lastName;
    // Render the EJS template with the user data
    res.render('users/all-users', { users , firstName, lastName});
    console.log("showAllUsers done")
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users. Please try again.');
  }
};
