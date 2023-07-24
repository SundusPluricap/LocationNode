import express from "express";
import {showAllUsers, getProfile, getEdit, postEdit, deleteUser} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"
import {showAllClients, createClient, create} from "../controllers/client.controle.js";


const clientRouter = express.Router();
// save for later
clientRouter.get('/', isAuthenticated, showAllClients);
clientRouter.get("/create-client",isAuthenticated, create);
clientRouter.post("/create-client",isAuthenticated ,createClient);
// // Route handler for /profiles/:userId
// userRouter.get('/:userId', isAuthenticated, getProfile);


// // Route handler for displaying the edit user form
// userRouter.get('/:userId/edit', isAuthenticated, getEdit);

// // Route handler for handling form submission and updating user data
// userRouter.post('/:userId/edit', isAuthenticated, postEdit);

// userRouter.get('/:userId/delete', deleteUser);

export default clientRouter;