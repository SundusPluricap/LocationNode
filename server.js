import express from "express";
import session from "express-session"; // Import the express-session package

import route from "./routes/auth_route.js";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
// import session from "express-session";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { APP_LOCALHOST: hostname, APP_PORT: port, SESSION_SECRET } = process.env;

const app = express();

/************* session*/

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
/************  middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');


app.use('/', route);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
