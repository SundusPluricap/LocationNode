import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Establishment from "./establishment-model.js";
dotenv.config();
const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE :db, USERNAMESQL: username ,PASSWORDSQL:mdp} = process.env;

// Create a new instance of Sequelize with your MySQL connection details
const sequelize = new Sequelize(db, username, mdp, {
  host: hostname,
  dialect: 'mysql',
});

// Define the User model
const User = sequelize.define('User', {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  establishmentId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


Establishment.hasMany(User, { foreignKey: 'establishmentId', onDelete: 'CASCADE' });
User.belongsTo(Establishment, { foreignKey: 'establishmentId', onDelete: 'CASCADE' });

export default User;
