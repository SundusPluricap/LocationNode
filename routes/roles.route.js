import express from "express";
import {register, createUser, showAllUsers, getProfile, getEdit, postEdit, deleteUser} from "../controllers/user.controller.js";
import { isAuthenticated} from "../middlewares/auth-middleware.js"
import {getRoles, setPermissionsForSuper,setPermissionsForAdmin, setPermissionsForEditor} from "../controllers/roles.controller.js"

const roleRouter = express.Router();

roleRouter.get('/:establishmentId', isAuthenticated, getRoles);

roleRouter.post('/:establishmentId/updatePermissionsForSuper',isAuthenticated, setPermissionsForSuper);

roleRouter.post('/:establishmentId/updatePermissionsForAdmin',isAuthenticated, setPermissionsForAdmin);

roleRouter.post('/:establishmentId/updatePermissionsForEditor',isAuthenticated, setPermissionsForEditor);
export default roleRouter;