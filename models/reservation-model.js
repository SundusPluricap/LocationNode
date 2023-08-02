import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Client from "./client-model";
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
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nbrPeople: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Synchronize the model with the database (create the table if it doesn't exist)
// Note: This should be done only once in the application, for example, during the initialization phase.
// You can use Sequelize migrations in a real-world application to manage database schema changes.
// (async () => {
//   try {
//     await Reservation.sync();
//     console.log('Reservation table synced successfully.');
//   } catch (error) {
//     console.error('Error syncing Reservation table:', error);
//   }
// })();


Client.hasMany(Reservation, { foreignKey: 'clientId' });
Reservation.belongsTo(Client, { foreignKey: 'clientId' });

export default Reservation;
