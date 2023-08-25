import User from "../models/user-model.js";
import Establishment from "../models/establishment-model.js";
import Permission from "../models/permission-model.js";
import '../models/user-has-permisssion-model.js';

export async function getUsersOrderedByEstablishmentId() {
    try {
      const users = await User.findAll({
        include: [{ model: Establishment }],
        order: [
          [Establishment, 'id', 'ASC'], // Order by establishment ID in ascending order
        ],
      });
      return users;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
}

export async function getUsersFromSameEstablishment(establishmentId) {

  const users = await User.findAll({
    where: {
      establishmentId
    }
  });

  return users

}



export const getUsersWithRole = async (establishmentId, role) => {
  try {
    const users = await User.findAll({
      where: {
        role: role, // Use the role parameter here
        establishmentId
      },
    });
    return users;
  } catch (error) {
    console.error('Error retrieving users with role:', error);
    throw error;
  }
};

export const oneUserWithRole = async (establishmentId, role) => {
  try {
    const foundUser = await User.findOne({
      where: {
        role: role,
        establishmentId
      },
      include: Permission, // Include the associated Permission model
      // include: Establishment
    });

    return foundUser;
  } catch (error) {
    console.error('Error retrieving users with role:', error);
    throw error;
  }
};

export const specificUser = async (id) => {
  try {
    const foundUser = await User.findOne({
      where: {
        id
      },
      include: Permission ,// Include the associated Permission model
      // include: Establishment
    });

    return foundUser;
  } catch (error) {
    console.error('Error retrieving users with role:', error);
    throw error;
  }
};


export const getPermissionForRole = async (establishmentId, role) => {
  const userWithPermissions = await oneUserWithRole(establishmentId, role); // Replace currentUser with the actual user object
  // console.log('User permissions:', userWithPermissions);
  let permissions
  if (userWithPermissions) {
       permissions = userWithPermissions.Permissions; // Assuming the association is named 'Permissions'
      // console.log('User permissions:', permissions);
      // console.log('User permissions:', permissions);
  } else {
      // console.log('User not found with the specified role.');
  }
  console.log('__________________________________________________ ' )

  console.log('from getPermissionForRole permissions:',permissions )
  console.log('__________________________________________________ ' )

  return permissions
}

export const getPermissionForUser = async (id) => {
  const userWithPermissions = await specificUser(id); // Replace currentUser with the actual user object
  // console.log('User permissions:', userWithPermissions);
  let permissions
  if (userWithPermissions) {
       permissions = userWithPermissions.Permissions; // Assuming the association is named 'Permissions'
      // console.log('User permissions:', permissions);
      // console.log('User permissions:', permissions);
  } else {
      console.log('User not found with the specified role.');
  }
  return permissions
}

// export const specificUsernoAsync = (id, callback) => {
//   try {
//     User.findOne({
//       where: {
//         id
//       },
//       // Include the associated Establishment model
//       include: Establishment
//     }).then(foundUser => {
//       callback(null, foundUser); // Call the callback with the result
//     }).catch(error => {
//       console.error('Error retrieving users with role:', error);
//       callback(error); // Call the callback with the error
//     });
//   } catch (error) {
//     console.error('Error in specificUsernoAsync:', error);
//     callback(error);
//   }
// };

// export const callback = (error, user) => {
//   if (error) {
//     console.error('Error:', error);
//     // Handle the error
//   } else {
//     // console.log('User:', user);
//     return user
//     // Handle the user data
//   }
// };