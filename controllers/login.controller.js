import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import Establishment from '../models/establishment-model.js';
let activeUserSessions= [];
dotenv.config();
const { SESSION_SECRET } = process.env;

export const login = (req, res) => {
    const errorMessage = req.session.errorMessage;
    // Clear the error message from the session
    delete req.session.errorMessage;
    res.render('home/login', { errorMessage });
};



export const chooseEstablishment = async (req, res) => {
    try {
        const errorMessage = req.session.errorMessage;
        const manyEstablishmentsForSameUser = req.session.manyEstablishmentsForSameUser

    
        // Assuming manyUsers is an array of user data including establishment information
        const establishments = manyEstablishmentsForSameUser.map(user => user.Establishment);
        delete req.session.errorMessage;
        res.render('home/loginEstablishment', { errorMessage, establishments });
    } catch (error) {
        console.error('Error rendering chooseEstablishment:', error);
        res.status(500).send('Error rendering chooseEstablishment. Please try again.');
    }
};
  

export const verifyLogin = async (req, res) => {
    console.log("verifyLogin starting")
    try {
        const { email, password } = req.body;

        // Find the user with the given email in the database
        const user = await User.findOne({ where: { email } });

        if (!user) {
            req.session.errorMessage = 'Invalid email or password';
            console.log("req.session.errorMessage:  ", req.session.errorMessage)
            return res.redirect('/login');
        }
        req.session.user = user;
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            req.session.errorMessage = 'Invalid email or password';
            console.log("req.session.errorMessage:  ", req.session.errorMessage)
            return res.redirect('/login');
        }

        activeUserSessions.push( { userid: user });
        // Set the user ID in the session to keep track of the authenticated user
        req.session.activeUserSessions = activeUserSessions;
        // const isUserActive = activeUserSessions.some(session => session.userid === user);
        // console.log('-------------------------------------------------------------------------')
        // console.log('----------------------logged in ----------------------', isUserActive)
        // console.log('-------------------------------------------------------------------------')

        // console.log('-----------------------------------111--------------------------------------')

        // activeUserSessions.forEach(session => {
        // console.log('-----------------------------------in loop--------------------------------------')

        //     console.log('logged',session.userid); // Access the userid property of each session
        //     // You can access other properties of the session object as well
        //     // console.log(session.firstName);
        //     // console.log(session.lastName);
        //     // ... other properties
        //   });


        //   req.session.activeUserSessions.forEach(session => {
        //     console.log('req.session logged',session.userid); // Access the userid property of each session
        //     // You can access other properties of the session object as well
        //     // console.log(session.firstName);
        //     // console.log(session.lastName);
        //     // ... other properties
        //   });

        // console.log('-----------------------------------111--------------------------------------')

        // console.log('-------------------------------------------------------------------------')


       res.redirect('/dashboard');
        
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login. Please try again.');
    }
    console.log("verifyLogin done")
};


export const chooseEstablishmentPost = async (req, res) => {
    console.log("chooseEstablishmentPost starting");
    try {
        const { establishmentId } = req.body;
        // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",req.body)
        // const user = req.session.manyEstablishmentsForSameUser
        // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh user.establishmentId: ",user.Establishment.id)
        // Find the user with the given establishmentId in the session data
        const user = req.session.manyEstablishmentsForSameUser.find(
            user => user.Establishment.id === parseInt(establishmentId)
        );

        
        activeUserSessions.push( { userid: user });
        // Set the user ID in the session to keep track of the authenticated user
        // req.session.user = user;
        // const isUserActive = activeUserSessions.some(session => session.userid === user);
        // console.log('-------------------------------------------------------------------------')
        // console.log('----------------------logged in ----------------------', isUserActive)
        // console.log('-------------------------------------------------------------------------')
        req.session.activeUserSessions = activeUserSessions;
        // console.log('----------------------logged in----------------------', activeUserSessions)
        // console.log('-----------------------------------111--------------------------------------')

        // activeUserSessions.forEach(session => {
        // console.log('-----------------------------------in loop--------------------------------------')

        //     console.log('logged',session.userid); // Access the userid property of each session
        //     // You can access other properties of the session object as well
        //     // console.log(session.firstName);
        //     // console.log(session.lastName);
        //     // ... other properties
        //   });


        //   req.session.activeUserSessions.forEach(session => {
        //     console.log('req.session logged',session.userid); // Access the userid property of each session
        //     // You can access other properties of the session object as well
        //     // console.log(session.firstName);
        //     // console.log(session.lastName);
        //     // ... other properties
        //   });

        // console.log('-----------------------------------111--------------------------------------')

        // console.log('-------------------------------------------------------------------------')


        // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh user",user)
        if (!user) {
            req.session.errorMessage = 'No user found for the selected establishment';
            console.log("req.session.errorMessage:  ", req.session.errorMessage);
            return res.redirect('/login');
        }
        const password = req.session.passwordTemp ;
        
        delete req.session.passwordTemp;
        
        const passwordMatch = await bcrypt.compare(password,user.password)
        if (!passwordMatch) {
            req.session.errorMessage = 'Invalid password for the selected establishment';
            console.log("req.session.errorMessage:  ", req.session.errorMessage);
            return res.redirect('/login');
        }
        
        req.session.user = user;
        delete req.session.manyEstablishmentsForSameUser;

        res.redirect(`/dashboard`);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login. Please try again.');
    }
    console.log("chooseEstablishmentPost done");
};