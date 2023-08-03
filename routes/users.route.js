import express from "express";
import {register, createUser, showAllUsers, getProfile, getEdit, postEdit, deleteUser} from "../controllers/user.controller.js";
import { isAuthenticated} from "../middlewares/auth-middleware.js"
import {checkUserExistence} from "../middlewares/user.middleware.js"

const userRouter = express.Router();
userRouter.get('/', isAuthenticated, showAllUsers);

userRouter.get("/register", register);
userRouter.get("/create-user", register);
userRouter.post("/create-user", checkUserExistence, createUser);
// Route handler for /users/:userId
userRouter.get('/:userId', isAuthenticated, getProfile);


// Route handler for displaying the edit user form
userRouter.get('/:userId/edit', isAuthenticated, getEdit);

// Route handler for handling form submission and updating user data
userRouter.post('/:userId/edit', isAuthenticated, postEdit);

userRouter.get('/:userId/delete', deleteUser);

export default userRouter;