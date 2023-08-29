import express from "express";
import {showAll, create, createPost ,download , getProfile, getEdit, postEdit, deleteButton, } from "../controllers/reservation.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"
// import pdfDownloadMiddleware from '../middlewares/afterDownload.middleware.js'
const reservationRouter = express.Router();
// save for later
reservationRouter.get('/', isAuthenticated, showAll);


reservationRouter.get('/create', isAuthenticated, create);

reservationRouter.post('/create', isAuthenticated, createPost);
reservationRouter.get('/download', isAuthenticated, download);
// reservationRouter.get('/redirect-after-download', handleRedirect);
export default reservationRouter;