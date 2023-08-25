import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
// import User from "../models/user-model.js";
dotenv.config();

const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE :db, USERNAMESQL: username ,PASSWORDSQL:mdp} = process.env;

// Create a new instance of Sequelize with your MySQL connection details
const sequelize = new Sequelize("loc-test-v1",'root','', {
  host: hostname,
  dialect: 'mysql',
});

// Define the User model
const Establishment  = sequelize.define('Establishment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  codePostal: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  SIRET: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  IBAN: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  BIC: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
});

export default Establishment;