import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const index = (req, res) => {
    res.render('home/index', { posts: [] });
  };