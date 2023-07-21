import express from "express";
import {showAllUsers, getProfile} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"

const userRouter = express.Router();
userRouter.get('/', isAuthenticated, showAllUsers);


// Route handler for /profiles/:userId
userRouter.get('/:userId', getProfile);
export default userRouter;