import express from "express";
// import {showAllUsers, getProfile, getEdit, postEdit, deleteUser} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"
import {create, createBatiment, showAlleBatiments, getProfileBatiment, getEdit, postEdit, deleteBatiment, getBatimentPhoto} from "../controllers/batiment.controller.js";
import Batiment from "../models/batiment-model.js";
// import Establishment from "../models/establishment-model.js";
import multer from "multer";
// createBatiment, showAlleBatiments, getProfileBatiment, getEdit, postEdit, deleteBatiment


const batimentstRouter = express.Router();
// save for later
batimentstRouter.get('/', isAuthenticated, showAlleBatiments);

batimentstRouter.get("/create-batiment",isAuthenticated, create);
batimentstRouter.post("/create-batiment",isAuthenticated ,createBatiment);

// // Route handler for /clients/:userId
batimentstRouter.get('/:batimentId',isAuthenticated, getProfileBatiment);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Rename the file to avoid overwriting files with the same name
    }
});

const upload = multer({ storage: storage });



batimentstRouter.post('/upload', upload.single('photo'), function (req, res) {
    // At this point, the photo has been uploaded and stored in the 'uploads/' folder
    const uploadedPhotoURL = 'http://localhost:8080' + req.file.filename; // Generate the URL for the uploaded photo

    // Save the URL to your database
    // Assuming you have a database model named 'User' and the 'photo' field is represented by 'photoURL'
    const user = new Batiment({
        // Other user data...
        photo: uploadedPhotoURL
    });

    // Save the user object to the database
    user.save(function (err) {
        if (err) {
            console.error('Error saving user:', err);
            // Handle the error
        } else {
            // User saved successfully
            // Redirect to a success page or send a success response
            res.redirect('/success');
        }
    });
});
  
batimentstRouter.get('/:batimentId/photo', getBatimentPhoto);
// // // Route handler for displaying the edit user form
batimentstRouter.get('/:batimentId/edit', isAuthenticated, getEdit);

// // // Route handler for handling form submission and updating user data
batimentstRouter.post('/:batimentId/edit', isAuthenticated, postEdit);

batimentstRouter.get('/:batimentId/delete', deleteBatiment);

export default batimentstRouter;