import Client from '../models/client-model.js'; 
import User from '../models/user-model.js'; 
import Room from '../models/room-model.js'; 
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import Reservation from '../models/reservation-model.js';
import {getRoomsByEstablishment, getAllRooms} from '../utiles/room.requete.js'
import {getPermissionForUser} from '../utiles/user.requete.js'
import moment  from  'moment'; 
import { isKing } from '../utiles/role.js';
import {belongTo} from '../utiles/role.permission.js'
import {getReservationsByEstablishment, getReservations, formatDate, duree, download} from '../utiles/reservations.requete.js'
const { RESERVE_SALLE, VIEW_RESERVATION, EDIT_RESERVATION, DELETE_RESERVATION, VIEW_CLIENT, VIEW_USER, VIEW_SALLE} = process.env;

export const showAll = async (req, res) => {
  const user = req.session.user;
  const userPermissions = await getPermissionForUser(user.id);
  let createPermission = userPermissions.some(perm => perm.name.trim() === RESERVE_SALLE);
  let viewPermission = userPermissions.some(perm => perm.name.trim() === VIEW_RESERVATION);

  let rooms , reservations
  let reservationsBySalle = {}; // Create an object to group reservations by salle

  if (user.role === "kingAdmin") {
    reservations = await getReservations();
    rooms = await getAllRooms()
    // Group reservations by salle
    reservations.forEach(reservation => {
      if (!reservationsBySalle[reservation.salleId]) {
        reservationsBySalle[reservation.salleId] = [];
      }
      reservationsBySalle[reservation.salleId].push(reservation);
    });
  } else {
    reservations = await getReservationsByEstablishment(user.establishmentId);
    // Group reservations by salle
    rooms = await getRoomsByEstablishment(user.establishmentId)
    reservations.forEach(reservation => {
      if (!reservationsBySalle[reservation.salleId]) {
        reservationsBySalle[reservation.salleId] = [];
      }
      console.log('here')
      reservationsBySalle[reservation.salleId].push(reservation);
    });
  }

  let hasPermission = isKing(user) || viewPermission
  // let hasPermission1 = isKing(user) || reservePermission
  let hasPermission2 = isKing(user) || createPermission
  console.log("----------------------------------------------")
  console.log("--------------------reservationsBySalle--------------------------", reservationsBySalle[4])

  console.log("----------------------------------------------")

  // Fetch rooms for reference
  // const rooms = await Room.findAll(); // You may need to adapt this query

  res.render('reservations/allReservations', { user, hasPermission, hasPermission2, reservationsBySalle, rooms, formatDate, reservations, duree });
}




export const create = async (req, res) => {
  try {
    // Get the user ID from the session (assuming it's stored in req.session.userId)
    const roomId = parseInt(req.params.roomId, 10);

    const user = req.session.user
    const createdBy = user.id;
    const userPermissions = await getPermissionForUser(user.id);

    let reservePermission = userPermissions.some(perm => perm.name.trim() === RESERVE_SALLE)
    let hasPermission = isKing(user) || reservePermission
    let rooms
    // Fetch clients whose userId matches the ID saved in the session
    let clients
    if(isKing(user)){
      clients = await Client.findAll();
      rooms = await getAllRooms()
    }
    else{
      clients = await Client.findAll({ where: { createdBy } });
      rooms = await getRoomsByEstablishment(user.establishmentId)
    }
    const errorMessage = req.session.errorMessage;
    // Clear the error message from the session
    delete req.session.errorMessage;
    if(hasPermission){
      res.render('reservations/createReservation', { clients, errorMessage, rooms, roomId });
    }
    else{
      res.render('home/403', { user });
    }

    
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).send('An error occurred while fetching reservations.');
  }
};

export const createPost = async(req, res) => {
  try {
    // Capture form data
    const { clientId, startDate, startTime, endTime, objet, nbrPeople, salleId } = req.body;

    
    const formattedStartTime = moment(startTime, 'h:mm A').format('HH:mm:ss');
    const formattedEndTime = moment(endTime, 'h:mm A').format('HH:mm:ss');
    // console.log('-------------------------timeeeeeeeeeee----------------',startTime, endTime, formattedStartTime,formattedEndTime)
    const user = req.session.user
    const uniqueIdentifier = uuidv4(); // You can also use the reservation ID if available

    // Create a devis like "devis_reservationID.pdf"
    const devisFileName = `devis_${uniqueIdentifier}.pdf`;

    // Determine the base directory
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // const baseDirectory = path.dirname(new URL(import.meta.url).pathname);
    const devisFilePath = path.join(__dirname,"..", "public", "devis", devisFileName); // Make sure this aligns with your directory structure
    const successMessage = req.session.successMessage;
    delete req.session.successMessage;
    const newReservation = await Reservation.create({
      startDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      objet,
      nbrPeople,
      // status: "ppending",
      devis:devisFileName,
      // facture: factureFileName,
      userId : user.id,
      salleId,
      clientId
    
    });
  
    const doc = new PDFDocument();

    // Set the PDF content
    doc.pipe(fs.createWriteStream(devisFilePath));
    doc.fontSize(16).text('Quote Details', { align: 'center' });
    doc.fontSize(12).text(`Client ID: ${clientId}`);
    doc.fontSize(12).text(`Start Date: ${startDate}`);
    doc.fontSize(12).text(`Start Time: ${startTime}`);
    doc.fontSize(12).text(`End Time: ${endTime}`);
    doc.fontSize(12).text(`Object: ${objet}`);
    doc.fontSize(12).text(`Number of People: ${nbrPeople}`);
    // Add more details as needed


    // Set the PDF content
    // doc.pipe(fs.createWriteStream(factureFilePath));
    // doc.fontSize(16).text('Quote Details', { align: 'center' });
    // doc.fontSize(12).text(`Client ID: ${clientId}`);
    // doc.fontSize(12).text(`Start Date: ${startDate}`);
    // doc.fontSize(12).text(`Start Time: ${startTime}`);
    // doc.fontSize(12).text(`End Time: ${endTime}`);
    // doc.fontSize(12).text(`Object: ${objet}`);
    // doc.fontSize(12).text(`Number of People: ${nbrPeople}`);
    // Add more details as needed

    /**
     * make this a middleware 
     */
    // At this point, the PDF is generated and saved

    await new Promise((resolve, reject) => {
      doc.pipe(fs.createWriteStream(devisFilePath))
        .on('finish', resolve)
        .on('error', reject);
      doc.end();
    });

    // await new Promise((resolve, reject) => {
    //   doc.pipe(fs.createWriteStream(factureFilePath))
    //     .on('finish', resolve)
    //     .on('error', reject);
    //   doc.end();
    // });

    res.redirect('/reservations')
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('An error occurred');
  }
};


export const generateFacture = async (req, res) => {
  console.log('get facture')
  try {
    const uniqueIdentifier = uuidv4();
    const reservationId = req.params.reservationId; // Assuming you can access the reservation ID from the URL
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).send('Reservation not found');
    }

    if (reservation.status !== 'pending') {
      return res.status(400).send('Reservation is not pending and cannot be confirmed');
    }

    // Update the reservation status to 'confirmed'
    reservation.status = 'confirmed';

    const factureFileName = `facture_${uniqueIdentifier}.pdf`;
    reservation.facture = factureFileName; // Update the facture field with the factureFileName

    await reservation.save(); // Save the updated status and facture in the database

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // Your code to generate the facture PDF goes here
    const factureFilePath = path.join(__dirname, '..', 'public', 'factures', factureFileName);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(factureFilePath));
    doc.fontSize(16).text('Quote Details', { align: 'center' });
    doc.fontSize(12).text(`Client ID: ${reservation.clientId}`);
    doc.fontSize(12).text(`Start Date: ${reservation.startDate}`);
    doc.fontSize(12).text(`Start Time: ${reservation.startTime}`);
    doc.fontSize(12).text(`End Time: ${reservation.endTime}`);
    doc.fontSize(12).text(`Object: ${reservation.objet}`);
    doc.fontSize(12).text(`Number of People: ${reservation.nbrPeople}`);
    console.log('--------------------------------------------here1---------------------------------')

    await new Promise((resolve, reject) => {
      doc.pipe(fs.createWriteStream(factureFileName))
        .on('finish', resolve)
        .on('error', reject);
      doc.end();
    });

    console.log('--------------------------------------------here2---------------------------------')
    res.redirect(`/reservations/${reservation.id}`)
  } catch (error) {
    console.error('Error generating Facture:', error);
    res.status(500).send('An error occurred');
  }
};

export const downloadDevis = async (req, res) => {
  const devisFileName = req.params.devisName;
  await download(devisFileName, "devis", res)
};


export const downloadFacture = async (req, res) => {
  const factureFileName = req.params.factureName;
  await download(factureFileName, "factures", res)
};


export const getProfile = async (req, res) => {
  const user = req.session.user
  const reservationId = parseInt(req.params.reservationId, 10); // Extract the establishment ID from the URL parameter and parse it as an integer.

  const userPermissions = await getPermissionForUser(user.id);
  let viewPermission = userPermissions.some(perm => perm.name.trim() === VIEW_RESERVATION)
  let editPermission = userPermissions.some(perm => perm.name.trim() === EDIT_RESERVATION)
  let deletePermission = userPermissions.some(perm => perm.name.trim() === DELETE_RESERVATION)
  let viewClientPermission = userPermissions.some(perm => perm.name.trim() === VIEW_CLIENT)
  let viewSallePermission = userPermissions.some(perm => perm.name.trim() === VIEW_SALLE)


  try {
    // Find the reservation with the given ID in the database.
    const reservation = await Reservation.findOne({ 
      where: { 
        id: reservationId 
      },
      include: 
      [
        { model: User },
        { model: Room },
        { model: Client }
      ]
     });

    if (!reservation) {
      return res.status(404).render('home/404', {user}); // Handle the case when the reservation ID is not found.
    }
    const param = reservation

    let hasPermission = isKing(user) || (viewPermission && belongTo(param.User.establishmentId,user.establishmentId)) 
    console.log('------------------------------------param--------------------------------------------------')
    console.log('------------------------------------param--------------------------------------------------', param.room)
    console.log('------------------------------------param--------------------------------------------------')
    if(hasPermission ){
      // res.render('reservations/profileReservation',{user, reservationId});
      res.render('reservations/profileReservation', {  user, param, editPermission, deletePermission,viewClientPermission, viewSallePermission, isKing,belongTo });
    }
    else {
      res.render('home/403', {user})
    }
    // Render the establishment profile template with the establishment data.
    
  } catch (error) {
    console.error('Error fetching Establishment:', error);
    res.status(500).send('Error fetching establishment. Please try again.');
  }
  console.log("getProfile for reservation done")




  
}

export const getEdit = (req, res) => {
  const user = req.session.user
  res.render('reservations/index',{user});
}

export const postEdit = (req, res) => {
  const user = req.session.user
  res.render('reservations/index',{user});
}

export const deleteButton = (req, res) => {
  const user = req.session.user
  res.render('reservations/index',{user});
}
