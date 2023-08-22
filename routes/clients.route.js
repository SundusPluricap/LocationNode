import express from "express";
// import {showAllUsers, getProfile, getEdit, postEdit, deleteUser} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"
import {showAllClients, createClient, create, getProfile, getEdit, deleteClient, postEdit} from "../controllers/client.controller.js";
import Client from "../models/client-model.js";

const clientRouter = express.Router();
// save for later
clientRouter.get('/', isAuthenticated, showAllClients);

clientRouter.get("/create-client",isAuthenticated, create);
clientRouter.post("/create-client",isAuthenticated ,createClient);

// Route handler for /clients/:userId
clientRouter.get('/:clientId',isAuthenticated, getProfile);


// // Route handler for displaying the edit user form
clientRouter.get('/:clientId/edit', isAuthenticated, getEdit);

// // Route handler for handling form submission and updating user data
clientRouter.post('/:clientId/edit', isAuthenticated, postEdit);

clientRouter.get('/:clientId/delete',isAuthenticated, deleteClient);

export default clientRouter;