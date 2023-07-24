import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import User from "../models/user-model.js";
dotenv.config();

const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE :db, USERNAMESQL: username ,PASSWORDSQL:mdp} = process.env;

// Create a new instance of Sequelize with your MySQL connection details
const sequelize = new Sequelize("loc-test-v1",'root','', {
  host: hostname,
  dialect: 'mysql',
});

// Define the User model
const Client = sequelize.define('Client', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: true, // Nullable as the association is optional
  },
});

// Create the association between User and Client
User.hasMany(Client, { foreignKey: 'idUser', as: 'clients' });
Client.belongsTo(User, { foreignKey: 'idUser', as: 'user' });

export default Client;