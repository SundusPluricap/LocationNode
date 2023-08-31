import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Client from "./client-model.js";
import User from "./user-model.js";
import Room from "./room-model.js";
dotenv.config();

const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE: db, USERNAMESQL: username, PASSWORDSQL: mdp } = process.env;

// Create a new instance of Sequelize with MySQL connection details
const sequelize = new Sequelize(db, username, mdp, {
  host: hostname,
  dialect: 'mysql',
});

// Define the Reservation model
const Reservation = sequelize.define('Reservation', {
  
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  objet: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nbrPeople: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
    allowNull: false,
    defaultValue: 'pending'
  },
  devis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facture: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Client.hasMany(Reservation, { foreignKey: 'clientId' , onDelete: 'CASCADE' });
Reservation.belongsTo(Client, { foreignKey: 'clientId' , onDelete: 'CASCADE' });

User.hasMany(Reservation, { foreignKey: 'userId' , onDelete: 'CASCADE' });
Reservation.belongsTo(User, { foreignKey: 'userId' , onDelete: 'CASCADE' });

Room.hasMany(Reservation, { foreignKey: 'salleId' , onDelete: 'CASCADE' });
Reservation.belongsTo(Room, { foreignKey: 'salleId' , onDelete: 'CASCADE' });

export default Reservation;
