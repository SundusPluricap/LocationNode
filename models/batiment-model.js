import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Establishment from "./establishment-model.js";
dotenv.config();

const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE: db, USERNAMESQL: username, PASSWORDSQL: mdp } = process.env;

// Create a new instance of Sequelize with MySQL connection details
const sequelize = new Sequelize(db, username, mdp, {
  host: hostname,
  dialect: 'mysql',
});

// Define the Batiment model
const Batiment = sequelize.define('Batiment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  establishmentId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Establishment.hasMany(Batiment, { foreignKey: 'establishmentId', onDelete: 'CASCADE' });
Batiment.belongsTo(Establishment, { foreignKey: 'establishmentId', onDelete: 'CASCADE' });


export default Batiment;
