import express from "express";
import {isAuthenticated} from "../middlewares/auth-middleware.js"

import {showTabsSalles, getProfile, create, createSalle, deleteSalle, getEdit, editSalle} from "../controllers/product.controller.js";
import {upload} from '../middlewares/multerProducts.middleware.js';

const productRouter = express.Router();

productRouter.get('/', isAuthenticated, showTabsSalles);

productRouter.get('/create-salle', isAuthenticated, create);
productRouter.post("/create-salle",isAuthenticated , upload.single('image'),createSalle);

productRouter.get('/:productId', isAuthenticated, getProfile);

productRouter.get('/:productId/edit', isAuthenticated, getEdit);

productRouter.post('/:productId/edit', isAuthenticated, upload.single('photo'), editSalle);

productRouter.get('/:productId/delete', deleteSalle);

export default productRouter;