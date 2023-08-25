import express from "express";

import session from "express-session"; // Import the express-session package
// const multer = require('multer');
import authRoute from "./routes/auth_route.js";
import userRouter from "./routes/users.route.js";
import clientRouter from "./routes/clients.route.js";
import establishmentRouter from "./routes/establishment.route.js";
import batimentstRouter from "./routes/batiment.route.js"
import roomRouter from "./routes/room.route.js"
import agendaRouter from "./routes/agenda.route.js"
import reservationRouter from "./routes/reservation.route.js"
import roleRouter from "./routes/roles.route.js"
import {kingAdminPermissions} from './utiles/role.permission.js'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import {upload} from './middlewares/multerBatiment.middleware.js';
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


///////////////// run kingAdminPermissions to give the kingAdmin all permissions//////////////////

// kingAdminPermissions()
//   .then(() => {
//     console.log('Permissions granted to kingAdmin role successfully.');
//   })
//   .catch(error => {
//     console.error('Error granting permissions:', error);
//   });


/************ Routes */
app.use('/', authRoute);
app.use('/users', userRouter);
app.use('/clients', clientRouter);
app.use('/establishments', establishmentRouter);
app.use('/batiments', batimentstRouter);
app.use('/rooms', roomRouter);
app.use('/agenda', agendaRouter);
app.use('/reservations', reservationRouter);
app.use('/roles', roleRouter);
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
