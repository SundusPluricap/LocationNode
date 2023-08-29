import Client from '../models/client-model.js'; // Assuming you have imported the Client model correctly
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import onFinished from 'on-finished';
export const showAll = (req, res) => {
    const user = req.session.user
    res.render('reservations/index',{user});
}


export const create = async (req, res) => {
  try {
    // Get the user ID from the session (assuming it's stored in req.session.userId)
    
    const user = req.session.user
    const createdBy = user.id;
    // Fetch clients whose userId matches the ID saved in the session
    const clients = await Client.findAll({ where: { createdBy } });

    const errorMessage = req.session.errorMessage;
    // Clear the error message from the session
    delete req.session.errorMessage;

    // Render the register view with the list of clients and the error message as local variables
    res.render('reservations/createReservation', { clients, errorMessage });
  } catch (error) {
    // Handle any error that might occur during fetching the clients
    console.error('Error fetching clients:', error);
    res.status(500).send('An error occurred while fetching clients.');
  }
};

export const createPost = async(req, res) => {
  try {
    // Capture form data
    const { clientId, startDate, startTime, endTime, objet, nbrPeople } = req.body;

    // Generate a unique identifier for the filename
    const uniqueIdentifier = uuidv4(); // You can also use the reservation ID if available

    // Create a filename like "devis_reservationID.pdf"
    const filename = `devis_${uniqueIdentifier}.pdf`;

    // Determine the base directory
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // const baseDirectory = path.dirname(new URL(import.meta.url).pathname);
    const pdfFilePath = path.join(__dirname,"..", "public", "devis", filename); // Make sure this aligns with your directory structure
    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the PDF content
    doc.pipe(fs.createWriteStream(pdfFilePath));
    doc.fontSize(16).text('Quote Details', { align: 'center' });
    doc.fontSize(12).text(`Client ID: ${clientId}`);
    doc.fontSize(12).text(`Start Date: ${startDate}`);
    doc.fontSize(12).text(`Start Time: ${startTime}`);
    doc.fontSize(12).text(`End Time: ${endTime}`);
    doc.fontSize(12).text(`Object: ${objet}`);
    doc.fontSize(12).text(`Number of People: ${nbrPeople}`);
    // Add more details as needed

  

    // At this point, the PDF is generated and saved

    await new Promise((resolve, reject) => {
      doc.pipe(fs.createWriteStream(pdfFilePath))
        .on('finish', resolve)
        .on('error', reject);
      doc.end();
    });


    // res.redirect('/')

    // Initiate download
    res.download(pdfFilePath, filename, (err) => {
      if (err) {
        console.error('Error downloading PDF:', err);
        res.status(500).send('An error occurred while downloading the PDF');
      } else {
        // Remove the PDF file after the download
        fs.unlinkSync(pdfFilePath);
       
      }
    });

    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('An error occurred');
  }
};

export const download = (req, res) => {
  const filename = `devis_0d6e7ef2-087e-4a72-a0b4-10a1d6ecb207.pdf`;

    // Determine the base directory
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // const baseDirectory = path.dirname(new URL(import.meta.url).pathname);
    const pdfFilePath = path.join(__dirname,"..", "public", "devis", filename); // Make sure this aligns with your directory structure
    
    res.download(pdfFilePath, filename, (err) => {
      if (err) {
        console.error('Error downloading PDF:', err);
        res.status(500).send('An error occurred while downloading the PDF');
      } else {
        // Remove the PDF file after the download
        // fs.unlinkSync(pdfFilePath);
       
      }
    });
  
};

export const getProfile = (req, res) => {
  const user = req.session.user
  res.render('reservations/index',{user});
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
