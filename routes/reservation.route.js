import express from "express";
import {showAll, create, createPost ,downloadDevis , getProfile,generateFacture, downloadFacture, getEdit, postEdit, deleteButton, } from "../controllers/reservation.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"
// import pdfDownloadMiddleware from '../middlewares/afterDownload.middleware.js'
const reservationRouter = express.Router();
// save for later
reservationRouter.get('/', isAuthenticated, showAll);


reservationRouter.get('/create', isAuthenticated, create);
reservationRouter.get('/:reservationId/confirm', isAuthenticated, generateFacture);
reservationRouter.get('/:reservationId', isAuthenticated, getProfile);
reservationRouter.get('/:devisName/downloadDevis', isAuthenticated, downloadDevis);
reservationRouter.get('/:factureName/downloadFacture', isAuthenticated, downloadFacture);
reservationRouter.post('/create', isAuthenticated, createPost);

reservationRouter.get('/create/:roomId', isAuthenticated, create);


reservationRouter.get('/download', isAuthenticated, downloadDevis);
// reservationRouter.get('/redirect-after-download', handleRedirect);
export default reservationRouter;