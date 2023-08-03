import express from "express";
import {index, dashboard} from "../controllers/auth.controller.js";
import {login,chooseEstablishment, verifyLogin, chooseEstablishmentPost} from "../controllers/login.controller.js";
// import {exist} from "../controllers/user.controller.js";
// import {register, createUser} from "../controllers/user.controller.js";
import {logout} from "../controllers/logout.controller.js";
import { isAuthenticated } from "../middlewares/auth-middleware.js"
import {  ifManyUsers } from "../middlewares/user.middleware.js"

const router = express.Router();

router.get("/", isAuthenticated, dashboard);
router.get("/login", login);
router.post("/login", ifManyUsers, verifyLogin);
router.get("/chooseEstablishment", chooseEstablishment);
router.post("/chooseEstablishment", chooseEstablishmentPost);
router.get("/dashboard", isAuthenticated, dashboard);
router.get('/logout', logout);


export default router;