import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Client from "./client-model.js";
dotenv.config();

const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE: db, USERNAMESQL: username, PASSWORDSQL: mdp } = process.env;

// Create a new instance of Sequelize with MySQL connection details
const sequelize = new Sequelize(db, username, mdp, {
  host: hostname,
  dialect: 'mysql',
});

// Define the Reservation model
const Reservation = sequelize.define('Reservation', {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
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
    type: DataTypes.ENUM,
    allowNull: false,
  },
  devis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facture: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Client.hasMany(Reservation, { foreignKey: 'clientId' , onDelete: 'CASCADE' });
Reservation.belongsTo(Client, { foreignKey: 'clientId' , onDelete: 'CASCADE' });

export default Reservation;
