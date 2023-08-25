import Batiment from "../models/batiment-model.js";
import Room from "../models/room-model.js";
import Image from "../models/image-model.js";
import Establishment from "../models/establishment-model.js";
import {batimentFindAllInEstablishment, batimentFindAll} from '../utiles/batiment.reqetes.js'
import {belongTo} from '../utiles/role.permission.js'
import {isKing} from '../utiles/role.js'
// import { Sequelize, DataTypes } from 'sequelize';
import {getPermissionForUser} from '../utiles/user.requete.js'
const { CREATE_SALLE, VIEW_SALLE, EDIT_SALLE , DELETE_SALLE, RESERVE_SALLE} = process.env;


export const showTabsSalles = async (req, res) => {
  try {
    const user = req.session.user
    let batiments
    if(user.role === "kingAdmin"){
      batiments = await batimentFindAll();
    }
    else{
      batiments = await batimentFindAllInEstablishment(user)
    }

    const buildingIds = batiments.map(building => building.id);

    const rooms = await Room.findAll({
      include: [
        {
          model: Batiment,
          where: {
            id: buildingIds,
          },
        },
      ],
    });
    

    // Filter batiments to only include those that have associated rooms of type "Salle"
    const filteredBatiments = batiments.filter((batiment) =>
      rooms.some((room) => room.batiment_id === batiment.id)
    );
    const userPermissions = await getPermissionForUser(user.id);
    let createPermission = userPermissions.some(perm => perm.name.trim() === CREATE_SALLE)
    let viewPermission = userPermissions.some(perm => perm.name.trim() === VIEW_SALLE)
    let reservePermission = userPermissions.some(perm => perm.name.trim() === RESERVE_SALLE)

    let hasPermission = isKing(user) || viewPermission
    let hasPermission1 = isKing(user) || reservePermission
    let hasPermission2 = isKing(user) || createPermission
    // Render the EJS template and pass filtered batiments and filtered rooms as locals
    res.render('rooms/all-salles', { batiments: filteredBatiments, rooms, user, hasPermission, hasPermission1, hasPermission2  });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error');
  }
};


// Controller function for rendering the createSalle view
export const create = async (req, res) => {
  // Check if there's an error message in the session
  const errorMessage = req.session.errorMessage;
  // const batiments = await Batiment.findAll({ attributes: ['id', 'name'] });
  const user = req.session.user
  
  const userPermissions = await getPermissionForUser(user.id);
  let createPermission = userPermissions.some(perm => perm.name.trim() === CREATE_SALLE)

  let hasPermission = isKing(user) || createPermission
  // Render the batiment profile template with the batiment data.
  
  if( hasPermission ){
    let batiments
    if(user.role === "kingAdmin"){
      batiments = await batimentFindAll();
    }
    else{
      batiments = await batimentFindAllInEstablishment(user)
    }
    // Clear the error message from the session
    delete req.session.errorMessage;
  
    res.render('rooms/createSalle', {  batiments, errorMessage });
  }
  else {
    res.render('home/403', {user})
  }
 
};

export const createSalle = async (req, res) => {
  console.log("createSalle starting")
  try {
    // const user = req.session.user

    console.log("req.body//////////////////////", req.body)
    const { name, capacity, price, batimentId } = req.body;
    const photo = req.file ? req.file.filename : null;

    const type = 'Salle';
    const newSalle = await Room.create({
      name,
      capacity,
      price,
      type,
      batiment_id : batimentId
    });

    const image = await Image.create({
      name: photo,
      type : "Room",
      room_id: newSalle.id, // Set the room_id to the newly created "Salle" (room) id
      description: null, // You can add a description if needed
    });


    console.log('New Salle created:', newSalle.toJSON());

    res.redirect('/rooms');
  } catch (error) {
    console.error('Error creating batiment:', error);
    res.status(500).send('Error creating batiment. Please try again.');
  }
  console.log("createSalle done")
};

export const getProfile = async (req, res) => {
  console.log("getProfile starting");
  
  const user = req.session.user
  const roomId = parseInt(req.params.roomId, 10); // Extract the room ID from the URL parameter and parse it as an integer.
  const userPermissions = await getPermissionForUser(user.id);
  // let createPermission = userPermissions.some(perm => perm.name.trim() === CREATE_SALLE)
  let viewPermission = userPermissions.some(perm => perm.name.trim() === VIEW_SALLE)
  let reservePermission = userPermissions.some(perm => perm.name.trim() === RESERVE_SALLE)
  let editPermission = userPermissions.some(perm => perm.name.trim() === EDIT_SALLE)
  let deletePermission = userPermissions.some(perm => perm.name.trim() === DELETE_SALLE)
  // console.log("////////////////////////////////")
  // console.log("test Permissions : ", "viewPermission",viewPermission,"editPermission", editPermission,"deletePermission",deletePermission,"reservePermission",reservePermission)
  // console.log("////////////////////////////////")
  try {
    // Find the room with the given ID in the database.
    const room = await Room.findOne({ 
      where: { id: roomId },
      include: [
        {
          model: Batiment,
        },
      ],
    });

    if (!room) {
      return res.status(404).send('room not found.'); // Handle the case when the room ID is not found.
    }

    // Fetch all the images associated with the room from the 'images' table.
    const roomImages = await Image.findAll({
      where: {
        room_id: roomId,
      },
    });

    const param = {
      room,
      images: roomImages,
    };
    
    let hasPermission = isKing(user) || (viewPermission && belongTo(param.room.Batiment.establishmentId,user.establishmentId)) 
    // Render the room profile template with the room data and images.
    if(hasPermission ){
      res.render('rooms/profileRoom', { user, param, reservePermission, editPermission, deletePermission,isKing, belongTo});
    }
    else {
      res.render('home/403', {user})
    }

    
  } catch (error) {
    console.error('Error fetching Room:', error);
    res.status(500).send('Error fetching Room. Please try again.');
  }
  console.log("getProfile done");
};


export const deleteSalle = async (req, res) => {
//   console.log("here/////////////////////////////////////////////////////////////////////////////////////////////////////// req.params: ", req.params)
  const roomId = parseInt(req.params.roomId, 10);
  const userPermissions = await getPermissionForUser(user.id);
  let deletePermission = userPermissions.some(perm => perm.name.trim() === DELETE_SALLE)

  
  try {
    const salle = await Room.findByPk(roomId);

    if (!salle) {
      return res.status(404).send('salle not found.');
    }

    let hasPermission = deletePermission && (isKing(user) || belongTo(param.establishmentId,user.establishmentId))

    if ( hasPermission ){

      // Delete the client from the database
      await salle.destroy();
      // Redirect to the list of all users or another page after successful deletion
      res.redirect('/rooms'); // Adjust the URL to redirect to the appropriate page after deletion
    }
    else {
      res.render('home/403', {user})
    }
   
  } catch (error) {
    console.error('Error deleting salle:', error);
    res.status(500).send('Error deleting salle.');
  }
};

export const getEdit = async (req, res) => {
  
  const user = req.session.user
  const roomId = parseInt(req.params.roomId, 10);

  const userPermissions = await getPermissionForUser(user.id);
  let editPermission = userPermissions.some(perm => perm.name.trim() === EDIT_SALLE)

  // const batiments = await Batiment.findAll({ attributes: ['id', 'name'] });
  let batiments
  if(user.role === "kingAdmin"){
    batiments = await batimentFindAll();
  }
  else{
    batiments = await batimentFindAllInEstablishment(user)
  }
  try {
    // Find the batiment with the given ID in the database.
    const salle = await Room.findOne({ 
      where: { id: roomId } ,
      include: [
        {
          model: Batiment,
        },
      ],
    });

    if (!salle) {
      return res.status(404).render('home/404', {user}); // Handle the case when the batiment ID is not found.
    }
    const param = salle
    // console.log('-----------param--------')
    console.log('-----------param--------',    param.Batiment.establishmentId)

    
    let hasPermission = editPermission && (isKing(user) || belongTo(param.Batiment.establishmentId,user.establishmentId) )
    console.log('-----------editPermission--------',hasPermission)
      // if 
    if(hasPermission ){
      res.render('rooms/editProfile', {batiments, param, user });
    }

    else {
      res.render('home/403', {user})
    }
    // Render the batiment profile template with the batiment data.
    
  } catch (error) {
    console.error('Error fetching prosucts:', error);
    res.status(500).send('Error fetching prosuct. Please try again.');
  }
}


export const editSalle = async (req, res) => {
  console.log("editSalle starting");
  try {
    const salleId = parseInt(req.params.roomId, 10) // Assuming the salle's ID is passed as a route parameter
    const { name, capacity, price, batimentId } = req.body;
    const photo = req.file ? req.file.filename : null;
    console.log("|||||||||||||||||||", salleId);
    // Find the salle to be edited by its ID
    const salleToUpdate = await Room.findByPk(salleId);

    if (!salleToUpdate) {
      return res.status(404).send("Salle not found.");
    }

    // Update the salle's information
    salleToUpdate.name = name;
    salleToUpdate.capacity = capacity;
    salleToUpdate.price = price;
    salleToUpdate.batiment_id = batimentId;

    await salleToUpdate.save();

    if (photo) {
      // Add a new image if a photo is provided
      await Image.create({
        name: photo,
        type: "Room",
        room_id: salleId,
        description: null, // You can add a description if needed
      });
    }

    console.log('Salle updated:', salleToUpdate.toJSON());

    // Redirect to the salle's profile page or any other relevant page
    res.redirect(`/rooms/${salleId}`);

  } catch (error) {
    console.error('Error updating salle:', error);
    res.status(500).send('Error updating salle. Please try again.');
  }

  console.log("editSalle done");
};
