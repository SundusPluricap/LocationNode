

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

export const getEdit = async (req, res) => {
  const firstName = req.session.user.firstName;
  const lastName = req.session.user.lastName;
  const users = await User.findAll();
  const userId = parseInt(req.params.userId, 10);
  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).send('User not found.');
  }

  // Render the edit profile template with the user data
  res.render('users/editProfile', { user, firstName, lastName });
}

export const postEdit = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Update the user data with the form data
    await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
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
  
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Delete the user from the database
    await user.destroy();

    // Redirect to the list of all users or another page after successful deletion
    res.redirect('/users'); // Adjust the URL to redirect to the appropriate page after deletion
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user.');
  }
};


export const exist = async (req, res) => {
  const firstName = req.session.user.firstName;
  const lastName = req.session.user.lastName;
  const errorMessage = req.session.errorMessage;
  const users = await User.findAll();
  // Clear the error message from the session
  delete req.session.errorMessage;
  res.render('users/users', { errorMessage, firstName, lastName, users });
};
