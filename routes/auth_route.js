import express from "express";
import {index,login,register} from "../controllers/auth-controller.js";
// import {existUser, authenticateUser} from "../middlewares/auth.js"

const router = express.Router();


router.get('/', index);
router.get("/login", login);
router.get("/register", register);

// Root route
// router.get("/", index);
// router.get("/login", login);
// router.post("/login",existUser, signup);
// router.get("/info",authenticateUser ,info);
// router.post("/verify",verify);

export default router;