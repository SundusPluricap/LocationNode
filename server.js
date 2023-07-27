import express from "express";

import session from "express-session"; // Import the express-session package
// const multer = require('multer');
import authRoute from "./routes/auth_route.js";
import userRouter from "./routes/users.route.js";
import clientRouter from "./routes/clients.route.js";
import establishmentRouter from "./routes/establishment.route.js";
import batimentstRouter from "./routes/batiment.route.js"
import productRouter from "./routes/product.route.js"


import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import {upload} from './middlewares/multer.middleware.js';
// import session from "express-session";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { APP_LOCALHOST: hostname, APP_PORT: port, SESSION_SECRET } = process.env;

const app = express();

// import multer from "multer";


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images'); // Set the destination folder where uploaded files will be stored
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         cb(null, Date.now() + ext); // Rename the file to avoid overwriting files with the same name
//     }
// });

// const upload = multer({ storage: storage });

// Set up multer for file upload

/************* session*/

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
/************  middlewares */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


///////////////// test upload images //////////////////
// app.get("/upload",(req, res)=>{
//   res.render("batiments/createBatiment")
// })

// app.post("/upload", upload.single('photo'), (req, res)=>{
//   res.send("uploaded")
// })

/************ Routes */
app.use('/', authRoute);
app.use('/users', userRouter);
app.use('/clients', clientRouter);
app.use('/establishments', establishmentRouter);
app.use('/batiments', batimentstRouter);
app.use('/products', productRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
