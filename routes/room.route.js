import express from "express";
import {isAuthenticated} from "../middlewares/auth-middleware.js"

import {showTabsSalles, getProfile, create, createSalle, deleteSalle, getEdit, editSalle} from "../controllers/room.controller.js";
import {upload} from '../middlewares/multerRooms.middleware.js';

const roomRouter = express.Router();

roomRouter.get('/', isAuthenticated, showTabsSalles);

roomRouter.get('/create-salle', isAuthenticated, create);
roomRouter.post("/create-salle",isAuthenticated , upload.single('image'),createSalle);

roomRouter.get('/:roomId', isAuthenticated, getProfile);

roomRouter.get('/:roomId/edit', isAuthenticated, getEdit);

roomRouter.post('/:roomId/edit', isAuthenticated, upload.single('photo'), editSalle);

roomRouter.get('/:roomId/delete',isAuthenticated, deleteSalle);

export default roomRouter;