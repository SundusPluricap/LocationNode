import express from "express";
import express from "multer";
import session from "express-session"; // Import the express-session package
// const multer = require('multer');
import authRoute from "./routes/auth_route.js";
import userRouter from "./routes/users.route.js";
import clientRouter from "./routes/clients.route.js";
import establishmentRouter from "./routes/establishment.route.js";
import batimentstRouter from "./routes/batiment.route.js"


import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
// import session from "express-session";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { APP_LOCALHOST: hostname, APP_PORT: port, SESSION_SECRET } = process.env;

const app = express();


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



app.use('/', authRoute);
app.use('/users', userRouter);
app.use('/clients', clientRouter);
app.use('/establishments', establishmentRouter);
app.use('/batiments', batimentstRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
