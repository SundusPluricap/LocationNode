import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import User from "./user-model.js";
dotenv.config();
const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE :db, USERNAMESQL: username ,PASSWORDSQL:mdp} = process.env;

// Create a new instance of Sequelize with your MySQL connection details
const sequelize = new Sequelize(db, username, mdp, {
  host: hostname,
  dialect: 'mysql',
});

const Permission = sequelize.define('Permission', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    object: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Define associations

export default Permission ;
