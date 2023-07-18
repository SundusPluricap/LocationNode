import express from "express";
import {index,login,register, createUser,verifyLogin, dashboard} from "../controllers/auth-controller.js";
import {checkUserExistence, isAuthenticated} from "../middlewares/auth-middleware.js"

const router = express.Router();


router.get('/', index);
router.get("/login", login);
router.get("/register", register);
router.post("/create-user",checkUserExistence, createUser);
router.get("/userExist", login);
router.post("/verifyLogin", verifyLogin);
router.get("/dashboard",isAuthenticated, dashboard);

export default router;