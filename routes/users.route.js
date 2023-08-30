import express from "express";
import {register, createUser, showAllUsers, getProfile, getEdit, passwordResetGet, passwordResetPost, postEdit, deleteUser} from "../controllers/user.controller.js";
import { isAuthenticated} from "../middlewares/auth-middleware.js"
import {checkUserExistence} from "../middlewares/user.middleware.js"

const userRouter = express.Router();
userRouter.get('/', isAuthenticated, showAllUsers);

userRouter.get("/register",isAuthenticated, register);
userRouter.get("/create-user",isAuthenticated, register); // to fix, this isn't right
userRouter.post("/create-user",isAuthenticated, checkUserExistence, createUser);
// Route handler for /users/:userId
userRouter.get('/:userId', isAuthenticated, getProfile);


// Route handler for displaying the edit user form
userRouter.get('/:userId/edit', isAuthenticated, getEdit);
userRouter.get('/:userId/passwordreset', isAuthenticated, passwordResetGet);
userRouter.post('/:userId/passwordreset', isAuthenticated, passwordResetPost );
// Route handler for handling form submission and updating user data
userRouter.post('/:userId/edit', isAuthenticated, postEdit);

userRouter.get('/:userId/delete',isAuthenticated, deleteUser);

export default userRouter;