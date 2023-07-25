import express from "express";
import {showAllUsers, getProfile, getEdit, postEdit, deleteUser} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"

const userRouter = express.Router();
userRouter.get('/', isAuthenticated, showAllUsers);


// Route handler for /users/:userId
userRouter.get('/:userId', isAuthenticated, getProfile);


// Route handler for displaying the edit user form
userRouter.get('/:userId/edit', isAuthenticated, getEdit);

// Route handler for handling form submission and updating user data
userRouter.post('/:userId/edit', isAuthenticated, postEdit);

userRouter.get('/:userId/delete', deleteUser);

export default userRouter;