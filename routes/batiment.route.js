import express from "express";
// import {showAllUsers, getProfile, getEdit, postEdit, deleteUser} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"
import {create, createBatiment, showAlleBatiments, getProfileBatiment, getEdit, postEdit, deleteBatiment} from "../controllers/batiment.controller.js";
// import Batiment from "../models/batiment-model.js";
// import Establishment from "../models/establishment-model.js";
// import multer from "multer";
// createBatiment, showAlleBatiments, getProfileBatiment, getEdit, postEdit, deleteBatiment
import {upload} from '../middlewares/multerBatiment.middleware.js';

const batimentstRouter = express.Router();
// save for later
batimentstRouter.get('/', isAuthenticated, showAlleBatiments);

batimentstRouter.get("/create-batiment",isAuthenticated, create);
batimentstRouter.post("/create-batiment",isAuthenticated ,createBatiment);

// // Route handler for /clients/:userId
batimentstRouter.get('/:batimentId',isAuthenticated, getProfileBatiment);




batimentstRouter.post('/upload', upload.single('photo'), createBatiment);
  
batimentstRouter.get('/:batimentId/edit', isAuthenticated, getEdit);

batimentstRouter.post('/:batimentId/edit', isAuthenticated, upload.single('photo'), postEdit);

batimentstRouter.get('/:batimentId/delete', deleteBatiment);

export default batimentstRouter;