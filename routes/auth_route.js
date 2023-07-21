import express from "express";
import {index, dashboard} from "../controllers/auth.controller.js";
import {login,verifyLogin} from "../controllers/login.controller.js";
import {exist} from "../controllers/user.controller.js";
import {register, createUser} from "../controllers/register.controller.js";
import {logout} from "../controllers/logout.controller.js";
import {checkUserExistence, isAuthenticated} from "../middlewares/auth-middleware.js"

const router = express.Router();

router.get("/", isAuthenticated, dashboard);
router.get("/login", login);
router.get("/register", register);
router.post("/create-user", checkUserExistence, createUser);
router.get("/userExist", exist);
router.post("/verifyLogin", verifyLogin);
router.get("/dashboard", isAuthenticated, dashboard);
router.get('/logout', logout);


export default router;