import express from "express";
import {showAllUsers} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"

const userRouter = express.Router();
userRouter.get('/', isAuthenticated, showAllUsers);

export default userRouter;