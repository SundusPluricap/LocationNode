import express from "express";
// import {showAllUsers, getProfile, getEdit, postEdit, deleteUser} from "../controllers/user.controller.js";
import {isAuthenticated} from "../middlewares/auth-middleware.js"

const agendaRouter = express.Router();
// save for later
agendaRouter.get('/', isAuthenticated,(req, res) => {
    const firstName = req.session.user.firstName;
      const lastName = req.session.user.lastName;
    res.render('apiTest/agenda',{firstName, lastName});
});

export default agendaRouter;