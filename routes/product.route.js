import express from "express";
import {isAuthenticated} from "../middlewares/auth-middleware.js"

import {showTabsSalles} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get('/', isAuthenticated, showTabsSalles);

export default productRouter;