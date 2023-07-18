import express from "express";
import route from "./routes/auth_route.js";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
// import session from "express-session";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { APP_LOCALHOST: hostname, APP_PORT: port } = process.env;

const app = express();

/************* session*/
// app.use(
//     session({
//       secret: process.env.SESSION_SECRET,
//       resave: false,
//       saveUninitialized: false,
//     })
//   );

/************  middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');


/*******************test bdd */
import User from './models/user.js';

// Create a new user
const createUser = async () => {
  try {
    await User.sync(); // Create the "User" table if it doesn't exist

    const newUser = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    console.log('New user created:', newUser.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

createUser();


app.use('/', route);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
