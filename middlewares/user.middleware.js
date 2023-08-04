import User from "../models/user-model.js";
import Establishment from '../models/establishment-model.js';
// Middleware to check if the user already exists
export const checkUserExistence = async (req, res, next) => {
  try {
    const user = req.session.user
    let establishment
    
    console.log("checkUserExistence starting req: |||||||||", req.body)
    const { email, establishmentId } = req.body;
    if(!establishmentId !== user.role !== "kingAdmin"){
      establishment = user.establishmentId
    }else{
      establishment = establishmentId
    }
    
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ where: { 
        email,
        establishmentId:establishment
    } });

    if (existingUser) {
      console.log("User with this email already exists.")
      req.session.errorMessage = 'User with this email already exists.';
      return res.redirect('/users');
    }

    // User does not exist, proceed to the next middleware (createUser)
    next();
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).send('Error checking user existence. Please try again.');
  }
  console.log("checkUserExistence done")
};

export const ifManyUsers = async (req, res, next) => {
    try {
        // const user = req.session.user
        console.log("ifManyUsers starting req: |||||||||", req.body)
        const { email, password } = req.body;
    
        // Check if the user already exists in the database
        const existingUser = await User.findAll({ 
            where: { email},
            include: Establishment, 
        });
    
        const userCount = existingUser.length;
        req.session.manyEstablishmentsForSameUser = existingUser;
        req.session.passwordTemp = password;

        if (userCount>1) {
            console.log("User has many ids existingUser -------->", userCount,"<-----------" )
            req.session.errorMessage = "Vous avez plus d'un compte, choisissez l'établissement.";
            return res.redirect('/chooseEstablishment');
        }
    
        // User does not exist, proceed to the next middleware (createUser)
        next();
    } catch (error) {
        console.error('Error checking how many establishment the user is associated with:', error);
        res.status(500).send('Error checking how many establishment the user is associated with. Please try again.');
    }
    console.log("ifManyUsers done")
};
