// /*******************test bdd */
// import User from './models/user.js';

// // Create a new user
// const createUser = async () => {
//   try {
//     await User.sync(); // Create the "User" table if it doesn't exist

//     const newUser = await User.create({
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john@example.com',
//       password: 'password123',
//       role: 'admin',
//     });

//     console.log('New user created:', newUser.toJSON());
//   } catch (error) {
//     console.error('Error creating user:', error);
//   }
// };

// createUser();