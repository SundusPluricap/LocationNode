import express from "express";
import {getAgenda} from "../controllers/agenda.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"

const agendaRouter = express.Router();
// save for later
agendaRouter.get('/', isAuthenticated, getAgenda);

export default agendaRouter;