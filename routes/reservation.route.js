import express from "express";
import {showAll, create, getProfile, getEdit, postEdit, deleteButton} from "../controllers/reservation.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"

const reservationRouter = express.Router();
// save for later
reservationRouter.get('/', isAuthenticated, showAll);


reservationRouter.get('/create', isAuthenticated, create);
export default reservationRouter;