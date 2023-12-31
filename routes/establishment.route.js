import express from "express";
// import {showAllUsers, getProfile, getEdit, postEdit, deleteUser} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"
import {create, createEstablishment, showAlleEstablishments,getProfile, getEdit, postEdit, deleteEstablishment} from "../controllers/establishment.controller.js";
// import Establishment from "../models/establishment-model.js";




const establishmentRouter = express.Router();
// save for later
establishmentRouter.get('/', isAuthenticated, showAlleEstablishments);

establishmentRouter.get("/create-establishment",isAuthenticated, create);
establishmentRouter.post("/create-establishment",isAuthenticated ,createEstablishment);

// // Route handler for /clients/:userId
establishmentRouter.get('/:establishmentId',isAuthenticated, getProfile);


// // // Route handler for displaying the edit user form
establishmentRouter.get('/:establishmentId/edit', isAuthenticated, getEdit);

// // // Route handler for handling form submission and updating user data
establishmentRouter.post('/:establishmentId/edit', isAuthenticated, postEdit);

establishmentRouter.get('/:establishmentId/delete',isAuthenticated, deleteEstablishment);

export default establishmentRouter;