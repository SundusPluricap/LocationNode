import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();
const { SESSION_SECRET } = process.env;

export const login = (req, res) => {
    const errorMessage = req.session.errorMessage;
    // Clear the error message from the session
    delete req.session.errorMessage;
    res.render('home/login', { errorMessage });
};

export const verifyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user with the given email in the database
        const user = await User.findOne({ where: { email } });

        if (!user) {
            req.session.errorMessage = 'Invalid email or password';
            return res.redirect('/login');
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            req.session.errorMessage = 'Invalid email or password';
            return res.redirect('/login');
        }

        // Set the user ID in the session to keep track of the authenticated user
        req.session.userId = user.id;
        req.session.role = user.role;
        req.session.firstName = user.firstName;
        req.session.lastName = user.lastName;
        // console.log("here//////////////////////////////////////////////////////////:\n user: ",user)
        const token = jwt.sign(
            {
                userId: user.id, // You can include any user-specific data in the token payload
                role: user.role,
            },
            SESSION_SECRET,
            { expiresIn: '1h' } // Token will expire in 1 hour
        );
        // Redirect the user to the desired page after successful login (e.g., dashboard, home)
        // res.redirect(`/dashboard?token=${token}`);

        // Check the user's role and redirect accordingly
        if (user.role === 'admin') {
            res.redirect(`/dashboard`);
        } else if (user.role === 'assistant') {
            res.redirect(`/dashboard`);
        } else {
            // If the role is not explicitly defined, you can redirect to a common dashboard or home page
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login. Please try again.');
    }
};