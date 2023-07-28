import express from "express";
import {isAuthenticated} from "../middlewares/auth-middleware.js"

import {showTabsSalles, getProfile} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get('/', isAuthenticated, showTabsSalles);

productRouter.get('/:productId', isAuthenticated, getProfile);

export default productRouter;